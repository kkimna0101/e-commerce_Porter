import React from "react";
import { Link } from "react-router-dom";
import CollabHero from "../../components/collab/CollabHero";
import CollabShowcase from "../../components/collab/CollabShowcase";
import CollabCollection from "../../components/collab/CollabCollection";
import "./Collab.scss";

const Collab = () => {
  return (
    <div className="collab-page">
      <CollabHero />
      <CollabShowcase />
      <CollabCollection />
    </div>
  );
};

export default Collab;
