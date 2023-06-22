import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={584}
    viewBox="0 0 280 584"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="1" y="538" rx="10" ry="10" width="95" height="30" />
    <rect x="0" y="404" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="452" rx="5" ry="5" width="280" height="55" />
    <rect x="128" y="530" rx="25" ry="25" width="152" height="42" />
    <rect x="0" y="0" rx="5" ry="5" width="280" height="390" />
  </ContentLoader>
);

export default Skeleton;
