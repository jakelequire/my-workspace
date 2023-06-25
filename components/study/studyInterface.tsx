// studyInterface.tsx
import StudyNavbar from "./src/navbar";
import Overview from "./src/overview";
import { StudyStateProvider } from "./StudyStateContext";

import style from "./study.module.css";

export default function StudyInterface(): JSX.Element {
  return (
    <div className={style.study_container}>
      <StudyStateProvider>
        <div className={style.study_navbar}>
          <StudyNavbar />
        </div>
        <div className={style.study_main}>
          <Overview />
        </div>
      </StudyStateProvider>
    </div>
  );
}
