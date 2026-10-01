import { Box, Grid, Stack } from "@mui/material";
import CusCard from "../components/CusCard";
import { getActiveUsers, getAllArticles } from "../api/dashboardApi";
import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import { BarChart } from "../charts/BarChart";


const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [articles, setArticles] = useState(null);



  const fetchAllArticles = async () => {
    try {
      const results = await getAllArticles();
      setArticles(results?.articles);
    } catch (error) {
      console.error(error);
    }
  }


  const fetchActiveUsers = async () => {
    try {
      const results = await getActiveUsers();
      setUsersCount(results?.users);
    } catch (error) {
      console.error("Error fetching active users:", error);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    fetchAllArticles();
  }, []);


  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CusCard title="Active Users" value={usersCount} metric={"+30% in last month"} />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <CusCard title="Total Users" value={usersCount} metric={"+15% in the last month"} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CusCard title="Published Articles" value="200" metric={"+45% in the last month"} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CusCard title="Authors" value="50" />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CusCard title="Articles in draft" value="14" />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CusCard title={'Pending Review'} value={articles?.length} />
        </Grid>
      </Grid>
      <Stack direction={"row"}>
        <Box sx={{ flex: 1 }}>
          <BarChart />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChart />
        </Box>
      </Stack>

    </Box>
  )
};

export default Dashboard;


