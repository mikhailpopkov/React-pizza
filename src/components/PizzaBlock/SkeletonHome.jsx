import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonHome = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="260" rx="10" ry="10" width="280" height="54" /> 
    <circle cx="129" cy="119" r="119" /> 
    <rect x="0" y="335" rx="10" ry="10" width="280" height="86" /> 
    <rect x="0" y="450" rx="10" ry="10" width="89" height="27" /> 
    <rect x="127" y="439" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
)

export default SkeletonHome;
