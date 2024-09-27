import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { Chip } from '@mui/material';
import { amber, green, red } from '@mui/material/colors';
import { RentalRequest } from '@/types/models.types';

const approvedColor = green[500];
const declinedColor = red[500];
const pendingColor = amber[500];

interface RequestedItemsCardProps {
  request: RentalRequest;
}

const backendBaseUrl = import.meta.env.VITE_API_URL;

const RequestedItemsCard: React.FC<RequestedItemsCardProps> = ({ request }) => {
  const imageUrl = `${backendBaseUrl}${request.item.image}`;

  return (
    <div>
      <ListItem alignItems="flex-start" sx={{ maxWidth: '70%' }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={request.item.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ display: 'inline' }}
              >
                Dates Requested:{' '}
              </Typography>
              {request.start_date} to {request.end_date}
            </React.Fragment>
          }
        />
        <ListItemText>
          <Link href={`/reviewRequest/${request.id}`}>
            View Request Details
          </Link>
        </ListItemText>
        <Chip
          label={request.status}
          sx={{
            backgroundColor:
              request.status === 'pending'
                ? pendingColor
                : request.status === 'approved'
                  ? approvedColor
                  : request.status === 'declined'
                    ? declinedColor
                    : 'default',
          }}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default RequestedItemsCard;
