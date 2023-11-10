import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function StartupProject() {
  
  // const project = {
  //   projectName: "My Project",
  //   projectDesc: "This is a description of my project.",
  // };
  
  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank");
    win.focus();
  }
  
  const {isDark} = useContext(StyleContext);
  
  const projects = isDark ? bigProjects.projects_dark : bigProjects.projects_light;

  if (!bigProjects.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "subTitle project-subtitle"
            }
          >
            {bigProjects.subtitle}
            {isDark ? <u><strong>{bigProjects.highlight_dark}</strong></u> :  <u><strong>{bigProjects.highlight_light}</strong></u>}
          </p>

          <div className="projects-container">
            {projects.map((project, i) => {
              return (
                <div
                  key={i}
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                >
                  {project.image ? (
                    <div className="project-image">
                      <img
                        src={project.link} //project.showLink ? project.link : project.image
                        alt={project.projectName}
                        className="card-image"
                      ></img>
                    </div>
                  ) : null}
                  <div className="project-detail">
                    <h5
                      className={isDark ? "dark-mode card-title" : "card-title"}
                    >
                      {project.projectName}
                    </h5>
                    <p
                      className={
                        isDark ? "dark-mode card-subtitle" : "card-subtitle"
                      }
                    >
                      {project.projectDesc}
                    </p>
                    {project.footerLink ? (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, i) => {
                          return (
                            <span
                              key={i}
                              className={
                                isDark ? "dark-mode project-tag" : "project-tag"
                              }
                              onClick={() => openUrlInNewTab(link.url)}
                            >
                              {link.name}
                            </span>
                          );
                        })}
                        <div>
                        <Popup trigger={<button>View Project Details</button>} modal>
                          <div>
                            <h1>{project.projectName}</h1>
                            <p>{project.projectDesc}</p>
                          </div>
                        </Popup>
                      </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}

// import React, {useContext} from "react";
// import "./StartupProjects.scss";
// import {bigProjects} from "../../portfolio";
// import {Fade} from "react-reveal";
// import StyleContext from "../../contexts/StyleContext";

// export default function StartupProject() {
//   function openUrlInNewTab(url) {
//     if (!url) {
//       return;
//     }
//     var win = window.open(url, "_blank");
//     win.focus();
//   }

//   const {isDark} = useContext(StyleContext);
//   if (!bigProjects.display) {
//     return null;
//   }
//   return (
//     <Fade bottom duration={1000} distance="20px">
//       <div className="main" id="projects">
//         <div>
//           <h1 className="skills-heading">{bigProjects.title}</h1>
//           <p
//             className={
//               isDark
//                 ? "dark-mode project-subtitle"
//                 : "subTitle project-subtitle"
//             }
//           >
//             {bigProjects.subtitle}
//           </p>

//           <div className="projects-container">
//             {bigProjects.projects.map((project, i) => {
//               return (
//                 <div
//                   key={i}
//                   className={
//                     isDark
//                       ? "dark-mode project-card project-card-dark"
//                       : "project-card project-card-light"
//                   }
//                 >
//                   {project.image ? (
//                     <div className="project-image">
//                       <img
//                         src={project.image}
//                         alt={project.projectName}
//                         className="card-image"
//                       ></img>
//                     </div>
//                   ) : null}
//                   <div className="project-detail">
//                     <h5
//                       className={isDark ? "dark-mode card-title" : "card-title"}
//                     >
//                       {project.projectName}
//                     </h5>
//                     <p
//                       className={
//                         isDark ? "dark-mode card-subtitle" : "card-subtitle"
//                       }
//                     >
//                       {project.projectDesc}
//                     </p>
//                     {project.footerLink ? (
//                       <div className="project-card-footer">
//                         {project.footerLink.map((link, i) => {
//                           return (
//                             <span
//                               key={i}
//                               className={
//                                 isDark ? "dark-mode project-tag" : "project-tag"
//                               }
//                               onClick={() => openUrlInNewTab(link.url)}
//                             >
//                               {link.name}
//                             </span>
//                           );
//                         })}
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Fade>
//   );
// }
