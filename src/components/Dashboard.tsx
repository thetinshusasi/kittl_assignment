import React, { useEffect, useMemo, useState } from "react";
import Loader from "./Loader";
import IllustrationCard from "./IllustrationCard";
import Illustration from "../models/Illustration";
import config from "../config.json";
import "./Dashboard.css";
/**
 * This component is responsible for rendering the main App
 */

export interface DashboardProps {
  page: number;
  limit: number;
  apiUrl: string;

}

const Dashboard = ({
  page = 1,
  limit = 10,
  apiUrl = `${config.baseUrlAPI}${config.illustrations}`,
}: DashboardProps) => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchIllustrations = async () => {
      try {
        setIsLoading(true);
        const url = `${apiUrl}?page=${page}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        setIllustrations(data);
      } catch (error) {
        console.error('Error fetching illustrations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIllustrations();
  }, [page, limit, apiUrl]);

  const illustrationsCards = useMemo(() => {
    return illustrations.map((illustration) => (
      <IllustrationCard
        key={illustration.id}
        imageUrl={illustration.preview}
        title={illustration.name}
        width={200}
        height={200}
      />
    ));
  }, [illustrations]);


  return (
    <div className="dashboard">
      <h1>Illustration Dashboard</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="illustration-grid">
          {illustrationsCards}
        </div>
      )}
    </div>
  );
};

export default Dashboard;