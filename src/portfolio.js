/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import gameDeveloper from "./assets/lottie/gameDeveloper";
import machineLearning from "./assets/lottie/machineLearning";



// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  isGameDeveloper: gameDeveloper,
  isMachineLearning : machineLearning, 
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Mohsin",
  title: "Hi all, I'm Mohsin",

  
  subTitle_light_1:"A passionate ",
  subTitle_light_2: " with experience building NLP systems, Computer Vision applications, recommendation models, and LLM-powered chatbots to solve real-world problems.",
  highlight_light: "Machine Learning Engineer",

  subTitle_dark_1:"A passionate  ",
  subTitle_dark_2: " with 2+ years of experience in Unity, Unreal, C++, C#, AR/VR, 3D modeling, and UI design. Proven track record of developing exceptional games and applications for PC and mobile platforms.",
  highlight_dark: "Game Developer",
  
  resumeLink:
    "https://drive.google.com/drive/folders/1mPJ_Rc3Cu-PR4xljp6sABrOq3TIrbgK5?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Mohsin-Ali-Mirza",
  linkedin: "https://www.linkedin.com/in/mohsin-ali-mirza/",
  gmail: "mohsinalimirxa@gmail.com",
  // gitlab: "https://gitlab.com/saadpasta",
  // facebook: "https://www.facebook.com/saad.pasta7",
  // medium: "https://medium.com/@saadpasta",
  // stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "About Me",
  subTitle: "A passionate Game Developer & Machine Learning Enthusiast with experience building innovative games and AI solutions",
  
  skills_dark: [
    emoji("⚡ I've deployed 3D hyper-casual games, intricate puzzle designs, and have explored various gaming platforms, including Unity, AR, VR, and traditional 2D games, consistently delivering engaging gaming experiences"),
    emoji("⚡ Proficient in Unreal Engine 5, I specialize in creating cinematic compositions with Niagra Particle System and Lumen, elevating visual storytelling. "),
    emoji("⚡ In the realm of VR, I've created interactive and enjoyable experiences using Oculus Rift, pushing the boundaries of VR gaming.")
  ],
  
  skills_light:[
    emoji("🌟 Specialized in crafting complex machine learning models, including deep learning, NLP, and computer vision solutions, for data-driven insights and automation."),
    emoji("🌟 Proficient in data engineering, I optimize data pipelines from collection to model training, ensuring actionable intelligence for ML applications."),
    emoji("🌟 Deployed multiple ML models at scale on cloud platforms like AWS, and Azure, seamlessly integrating them into production systems for real-time predictions and insights.")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

softwareSkills: [
  {
    skillName: "unity",
    skillIcon: require("./assets/images/skills/unity.png")
  },
  {
    skillName: "unreal",
    skillIcon: require("./assets/images/skills/unreal.png")
  },
  {
    skillName: "tensorflow",
    skillIcon: require("./assets/images/skills/tensorflow.png")
  },
  {
    skillName: "pytorch",
    skillIcon: require("./assets/images/skills/pytorch.png")
  },
  {
    skillName: "opencv",
    skillIcon: require("./assets/images/skills/opencv.png")
  },
  {
    skillName: "yolov8",
    skillIcon: require("./assets/images/skills/yolov8.png")
  },
  {
    skillName: "amazon",
    skillIcon: require("./assets/images/skills/aws.png")
  },
  {
    skillName: "azure",
    skillIcon: require("./assets/images/skills/azure.png")
  },
  {
    skillName: "mongodb",
    skillIcon: require("./assets/images/skills/mongodb.png")
  },
  {
    skillName: "express",
    skillIcon: require("./assets/images/skills/express.png")
  },
  {
    skillName: "react",
    skillIcon: require("./assets/images/skills/react.png")
  },
  {
    skillName: "nodejs",
    skillIcon: require("./assets/images/skills/nodejs.png")
  },
  {
    skillName: "git",
    skillIcon: require("./assets/images/skills/git.png")
  },
  {
    skillName: "sql",
    skillIcon: require("./assets/images/skills/sql.png")
  },
  {
    skillName: "firebase",
    skillIcon: require("./assets/images/skills/firebase.png")
  },
  {
    skillName: "vuforia",
    skillIcon: require("./assets/images/skills/vuforia.png")
  },
  {
    skillName: "occulus",
    skillIcon: require("./assets/images/skills/occulus.png")
  },
  {
    skillName: "blender",
    skillIcon: require("./assets/images/skills/blender.png")
  },
  {
    skillName: "photoshop",
    skillIcon: require("./assets/images/skills/photoshop.png")
  },
  {
    skillName: "premiere_pro",
    skillIcon: require("./assets/images/skills/premiere_pro.png")
  },
  {
    skillName: "Jira",
    skillIcon: require("./assets/images/skills/jira.png")
  },
  {
    skillName: "docker",
    skillIcon: require("./assets/images/skills/docker.png")
  },
  {
    skillName: "matlab",
    skillIcon: require("./assets/images/skills/matlab.png")
  },
  {
    skillName: "matplotlib",
    skillIcon: require("./assets/images/skills/matplotlib.png")
  },
  {
    skillName: "pandas",
    skillIcon: require("./assets/images/skills/pandas.png")
  },
  {
    skillName: "seaborn",
    skillIcon: require("./assets/images/skills/seaborn.png")
  },
  {
    skillName: "mysql",
    skillIcon: require("./assets/images/skills/mysql.png")
  },
  {
    skillName: "openmp",
    skillIcon: require("./assets/images/skills/openmp.png")
  },
  {
    skillName: "c",
    skillIcon: require("./assets/images/skills/c.png")
  },
  {
    skillName: "c++",
    skillIcon: require("./assets/images/skills/c_plus_plus.png")
  },
  {
    skillName: "c#",
    skillIcon: require("./assets/images/skills/c_sharp.png")
  },
  {
    skillName: "dotnet",
    skillIcon: require("./assets/images/skills/dotnet.png")
  },
  {
    skillName: "python",
    skillIcon: require("./assets/images/skills/python.png")
  },
  {
    skillName: "html",
    skillIcon: require("./assets/images/skills/html.png")
  },
  {
    skillName: "css",
    skillIcon: require("./assets/images/skills/css.png")
  },
  {
    skillName: "javascript",
    skillIcon: require("./assets/images/skills/javascript.png")
  }


  
  // {
  //   skillName: "sass",
  //   fontAwesomeClassname: "fab fa-sass"
  // },
  // {
  //   skillName: "JavaScript",
  //   fontAwesomeClassname: "fab fa-js"
  // },
  // {
  //   skillName: "reactjs",
  //   fontAwesomeClassname: "fab fa-react"
  // },
  // {
  //   skillName: "nodejs",
  //   fontAwesomeClassname: "fab fa-node"
  // },
  // {
  //   skillName: "swift",
  //   fontAwesomeClassname: "fab fa-swift"
  // },
  // {
  //   skillName: "npm",
  //   fontAwesomeClassname: "fab fa-npm"
  // },
  // {
  //   skillName: "sql-database",
  //   fontAwesomeClassname: "fas fa-database"
  // },
  // {
  //   skillName: "aws",
  //   fontAwesomeClassname: "fab fa-aws"
  // },
  // {
  //   skillName: "firebase",
  //   fontAwesomeClassname: "fas fa-fire"
  // },
  // {
  //   skillName: "python",
  //   fontAwesomeClassname: "fab fa-python"
  // },
  // {
  //   skillName: "docker",
  //   fontAwesomeClassname: "fab fa-docker"
  // },
  // {
  //   skillName: "sass",
  //   fontAwesomeClassname: "fab fa-sass"
  // },
  // {
  //   skillName: "JavaScript",
  //   fontAwesomeClassname: "fab fa-js"
  // },
  // {
  //   skillName: "reactjs",
  //   fontAwesomeClassname: "fab fa-react"
  // },
  // {
  //   skillName: "nodejs",
  //   fontAwesomeClassname: "fab fa-node"
  // },
  // {
  //   skillName: "swift",
  //   fontAwesomeClassname: "fab fa-swift"
  // },
  // {
  //   skillName: "npm",
  //   fontAwesomeClassname: "fab fa-npm"
  // },
  // {
  //   skillName: "sql-database",
  //   fontAwesomeClassname: "fas fa-database"
  // },
  // {
  //   skillName: "aws",
  //   fontAwesomeClassname: "fab fa-aws"
  // },
  // {
  //   skillName: "firebase",
  //   fontAwesomeClassname: "fas fa-fire"
  // }
],
display: true // Set false to hide this section, defaults to true
};
// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "FAST National University Of Computer Sciences",
      logo: require("./assets/images/fastLogo.png"),
      subHeader: "Bachelors of Science in Computer Science",
      duration: "August 2020 - August 2024",
      desc: "Current CGPA: 3.7",
      descBullets: [
        "Rector List (4 SGPA)",
        "5 Consecutive Dean's List (> 3.5 SGPA)"
      ]
    },
  ]
};

// Your top 3 proficient stacks/tech experience

const reelLink = {
  display: true, //Set it to true to show Proficiency Section
  darkVideoLink : "https://www.youtube.com/watch?v=Sox-nsKzZCk",
  videoLink: "https://youtu.be/GuQRgCTwnXQ" //Replace this with the link to your portfolio reel video
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Machine Learning Intern",
      company: "Syslab.Ai",
      companylogo: require("./assets/images/Syslab-logo.png"),
      date: "June 2023 – August 2023",
      desc: "",
      descBullets: [
        " Engineered Content-Based Recommendation systems, boosting the relevancy of suggested questions",
        " Leveraged NLP methods (text classification, Transformers) to auto-map questions to relevant topics.",
        " Utilized an LLM-based chatbot using Llama 7b model to deliver tutoring and handle FAQs"
      ]
    },
    {
      role: "Unreal Developer Bootcamp",
      company: "Reality Forge",
      companylogo: require("./assets/images/realityForgeLogo.png"),
      date: "Jan 2023 – Apr 2023",
      desc: "",
      descBullets: [
        "Created a high-fidelity cinematic composition as a completion of Reality Forge’s Unreal Internship Program",
        "Utilized Niagara (Particle System) and Lumen along with Unreal's MegaScans to create a short fan-made Cinematic Reel featuring Last Of Us"
      ]
    },
    {
      role: "Unity Developer Bootcamp",
      company: "Mindstorm Studios",
      companylogo: require("./assets/images/mindstormLogo.png"),
      date: "July 2022 – Sep 2022",
      desc: "",
      descBullets: [
        " Deployed a 3D hyper casual game with idle stacking game mechanic for Mindstorm Studios Summer Internship Program",
        "  Composed 2 brain teaser puzzles for the game to challenge the player and utilized object-oriented programming"
      ]
    },


    
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "PERSONAL PROJECTS FOR ",
  highlight_dark: "GAME DEVELOPMENT",
  highlight_light: "MACHINE LEARNING",
  projects_light: [
    {
      image: require("./assets/images/gifs/Sign-Detection.gif"),
      link: "https://i.imgur.com/0VrX1Id.gif",
      showLink: false,                               //Show icon from directory or from a link?
      projectName: "Sign Language Detection",
      projectDesc: "Developed and trained an LSTM-based Sign Language Detection using TensorFlow",
      footerLink: [
        {
          name: "Visit Notebook",
          url: "https://github.com/Mohsin-Ali-Mirza/Sign-Language-Detection-LSTM"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/Llama.gif"),
      link: "https://i.imgur.com/UYsQmDx.gif",
      showLink: false,
      projectName: "Llama2 chatbot",
      projectDesc: "Utilized Llama2 7b model for LLM-based chatbot",
      footerLink: [
        {
          name: "Not Available",
          url: ""
        },
        
      ]
    },
    {
      image: require("./assets/images/gifs/Sam.gif"),
      link: "https://i.imgur.com/CPLV0ix.gif",
      showLink: true,
      projectName: "Segmentation In Traffic Systems",
      projectDesc: "Demonstrated SAM’s effectiveness in generating segmentation masks for complex objects in challenging lighting and weather conditions",
      footerLink: [
        {
          name: "Visit Notebook",
          url: "https://github.com/Mohsin-Ali-Mirza/SAM--Segmentation_Anything_Meta-_Traffic"
        },
        
      ]
    },
    {
      image: require("./assets/images/gifs/yolov8.gif"),
      link: "https://i.imgur.com/yp99h7J.gif",
      showLink: false,
      projectName: "Passenger Detection In Subway Systems",
      projectDesc: " Developed a real-time object detection system using the YOLOv8 to enhance train safety by detecting people in the danger zone near train tracks.",
      footerLink: [
        {
          name: "Visit Notebook",
          url: "https://github.com/Mohsin-Ali-Mirza/Real-time-Object-Detection-for-Train-Safety-YOLOv8"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/Cycle-GANS.gif"),
      link: "https://i.imgur.com/1hrd7YB.gif",
      showLink: true,
      projectName: "Cycle‑GANS Sytle Transfer",
      projectDesc: " Developed and implemented a Style-Transfer Cycle GANs project, utilizing deep learning techniques to transfer artistic styles between images.",
      footerLink: [
        {
          name: "Visit Notebook",
          url: "https://github.com/Mohsin-Ali-Mirza/Cycle-Gans-Style-Transfer"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/flappy-bird-ai.gif"),
      link: "https://i.imgur.com/zLOatiY.gif",
      showLink: true,
      projectName: "Flappy Bird Genetic AI",
      projectDesc: "The AI was able to learn how to play the game on its own by leveraging deep learning techniques and evolving its neural network architecture",
      footerLink: [
        {
          name: "Show Video",
          url: "https://mohsinalimirxa.wixsite.com/experience/copy-of-shaders-animation"
        }
        //  you can add extra buttons here.
      ]
    },
  ],

  projects_dark: [
    {
      image: require("./assets/images/gifs/call-of-objects.gif"),
      link: "https://i.imgur.com/VKjVt8M.gif",
      showLink: false,
      projectName: "Call Of Objects",
      projectDesc: "Individually designed and developed a 2D retro-styled Platformer game with interactive game mechanics",
      footerLink: [
        {
          name: "Show Video",
          url: "https://mohsinalimirxa.wixsite.com/experience/callofobjects"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/occulus.gif"),
      link: "https://i.imgur.com/JCL83Jc.gif",
      showLink: true,
      projectName: "Soft Ball Shooter",
      projectDesc: "Developed a small shooter Virtual Reality Game on Occulus Rift",
      footerLink: [
        {
          name: "Show Video",
          url: "https://www.linkedin.com/posts/mohsin-ali-mirza_occulusrift-virtualreality-quest2-activity-6973711415580717056-hXDz?utm_source=share&utm_medium=member_desktop"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/cinematic.gif"),
      link: "https://i.imgur.com/JeiqGu0.gif",
      showLink: false,
      projectName: "Last Of Us - Unreal",
      projectDesc: "Fan-made short Cinematic Reel made on Unreal Engine 5",
      footerLink: [
        {
          name: "Show Video",
          url: "https://www.artstation.com/artwork/JvvEoz"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/flappy-bird-ai.gif"),
      link: "https://i.imgur.com/zLOatiY.gif",
      showLink: true,
      projectName: "Flappy Bird Genetic AI",
      projectDesc: "The AI was able to learn how to play the game on its own by leveraging deep learning techniques and evolving its neural network architecture",
      footerLink: [
        {
          name: "Show Video",
          url: "https://mohsinalimirxa.wixsite.com/experience/copy-of-shaders-animation"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/leonardo.gif"),
      link: "https://i.imgur.com/gHW1oo9.gif",
      showLink: true,
      projectName: "Mona Lisa AR",
      projectDesc: "Created an Augmented Reality app for art enthusiasts to admire the beauty of Leonardo Dicaprico’s paintings and listen to audio documentation",
      footerLink: [
        {
          name: "Show Video",
          url: "https://www.linkedin.com/posts/mohsin-ali-mirza_augmentedreality-technology-development-activity-6960603981882531841-fnFF?utm_source=share&utm_medium=member_desktop"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/shader-animation-1.gif"),
      link: "https://i.imgur.com/CvcNKhC.gif",
      showLink: true,
      projectName: "Unity Shader Animation",
      projectDesc: "Tried some Unity Shader's for fun",
      footerLink: [
        {
          name: "",
          url: "Not Available"
        }
      ]
    },
    {
      image: require("./assets/images/gifs/shader-animation-2.gif"),
      link: "https://i.imgur.com/kOqq3ot.gif",
      showLink: true,
      projectName: "Fire Animation",
      projectDesc: "A mini lighting animation project done on Unity",
      footerLink: [
        {
          name: "Show Video",
          url: "https://www.linkedin.com/posts/mohsin-ali-mirza_i-decided-to-create-a-short-animation-on-activity-6958441023979032576-hDpI?utm_source=share&utm_medium=member_desktop"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/rematch.gif"),
      link: "https://i.imgur.com/5CFHYQM.gif",
      showLink: true,
      projectName: "Rematch",
      projectDesc: "A stress relief 3D fighting game built with in app purchases",
      footerLink: [
        {
          name: "Show Video",
          url: "https://mohsinalimirxa.wixsite.com/experience/rematch"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/hyper-casual.gif"),
      link: "https://i.imgur.com/HkS7kQZ.gif",
      showLink: true,
      projectName: "Hyper Casual Game",
      projectDesc: "  Deployed a 3D hyper casual game with idle stacking game mechanic for Mindstorm Studios Summer Internship Program",
      footerLink: [
        {
          name: "Show Video",
          url: "https://www.linkedin.com/posts/mohsin-ali-mirza_design-opportunity-experience-activity-6981904027349344256-CEZ4?utm_source=share&utm_medium=member_desktop"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/gifs/anatomy-ar.gif"),
      link: "https://i.imgur.com/0IfWAEo.gif",
      showLink: true,
      projectName: "Anatomy AR",
      projectDesc: "A short Augmented Reality app for human anatomy to easily show the skeletal and the muscles of a human body to the users",
      footerLink: [
        {
          name: "Show Video",
          url: "https://mohsinalimirxa.wixsite.com/experience/ar-demo"
        }
        //  you can add extra buttons here.
      ]
    }
  ],

  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AWS Cloud Technical Essentials",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_AWS_Cloud 75YMNM6W2KHW-1.png"),
      imageAlt: "AWS Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },
    {
      title: "Introduction to Machine Learning in Production",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Introduction_to_Machine Learning_in_Production_CKD249G59UY8-1.png"),
      imageAlt: "DeepLearning.AI Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Neural Network And Deep Learning",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Neural_Network_And_Deep_Learning_SF2UQZ4TUC2E-1.png"),
      imageAlt: "DeepLearning.AI Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Introduction To Unreal Engine",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_RealityForge-Introduction_To_Unreal_Engine-1.png"),
      imageAlt: "RealityForge Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Introduction To Tensorflow in AI,ML & Deep Learning",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Tensorflow VHK79L92ZH6D-1.png"),
      imageAlt: "DeepLearning.AI Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Software Engineering Virtual Experience",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_EA-Software_Engineering_Virtual_Experience-1.png"),
      imageAlt: "EA Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Mindstorm - Summer Program",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Mindstorm-Summer_Program-1.png"),
      imageAlt: "MindStorm Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Scrum Foundation-1",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Scrum_Foundation-1.png"),
      imageAlt: "CertiProf Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Remote Development with Dev Containers",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_MSLA1.png"),
      imageAlt: "MSLA Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Github Essentials",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_MSLA2.png"),
      imageAlt: "MSLA Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },

    {
      title: "Data Science Bootcamp",
      subtitle:
        "",
      image: require("./assets/images/Certificates/Certificate_Folio_3_ata_Science_Bootcamp.png"),
      imageAlt: "Folio3 Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.google.com"
        }
      ]
    },


  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+92-3317534906",
  email_address: "mohsinalimirxa@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  reelLink,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
