import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../components/Cards/ResumeSummaryCard";
import TemplateModal from "../components/Cards/TemplateModal";
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllResumes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleCreateResume = async (template) => {
    setOpenCreateModal(false);
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        templateId: template.id,
        title: `${template.name} Resume`,
      });
      fetchAllResumes();
      navigate(`/resume/${response.data._id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await axiosInstance.delete(`${API_PATHS.RESUME.DELETE}/${resumeId}`);
      setAllResumes(allResumes.filter((r) => r._id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <DashboardLayout>
      <TemplateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSelectTemplate={handleCreateResume}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add New Resume</h3>
        </div>

        {loading ? (
          <div className="col-span-4 flex items-center justify-center">Loading...</div>
        ) : (
          allResumes.map((resume) => (
            <Box key={resume?._id} className="relative">
              <ResumeSummaryCard
                imgUrl={resume?.thumbnailLink || null}
                title={resume?.title}
                lastUpdated={
                  resume?.updatedAt
                    ? moment(resume.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/resume/${resume?._id}`)}
              />
              <Box className="absolute top-2 right-2 flex gap-2 z-10">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/resume/${resume?._id}`);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteResume(resume?._id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
