import React from 'react';
import { IoColorPalette } from 'react-icons/io5';
import { MdDescription } from 'react-icons/md';

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template:{
      theme:"",
      IoColorPalette:"",
    },
    contactInfo:{
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience:[
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education:[
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });
  const[errorMsg, setErrorMsg]=useState("");
  const[isLoading, setIsLoading]=useState(false);

  return (
    <div>EditResume</div>
  )
}
 
export default EditResume