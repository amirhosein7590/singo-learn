import { memo, useEffect } from "react";
import SectionTitle from "../components/sections/About_Us/SeactionTitle";
import FeatureItem from "../components/sections/About_Us/FeatureItem";
import pattern from '../constants/pages/AboutUs'

function AboutUs() {
  useEffect(() => {
    document.title = "درباره ما";
  }, []);
  return (
    <div className="flex flex-col">
      {pattern.map(section => (
        <SectionTitle title={section.title}>
          {section.children.map(feature => (
            <FeatureItem description={feature.description} title={feature?.title} />
          ))}
        </SectionTitle>
      ))}
    </div>
  );
}
export default memo(AboutUs)
