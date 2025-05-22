import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../features/employeeSlice';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const Stats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.employees.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (!stats) return <Typography>Loading stats...</Typography>;

  return (
    <div>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Highest Salary by Department</Typography>
        <List>
          {stats.highestSalaries.map(({ department, max_salary }) => (
            <ListItem key={department}>
              <ListItemText primary={`${department}: $${max_salary}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Salary Range Counts</Typography>
        <List>
          {stats.salaryRanges.map(({ salary_range, count }) => (
            <ListItem key={salary_range}>
              <ListItemText primary={`${salary_range}: ${count}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Youngest Employee by Department</Typography>
        <List>
          {stats.youngest.map(({ department, employee, age }) => (
            <ListItem key={department}>
              <ListItemText primary={`${department}: ${employee} (${age} years old)`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Stats;
