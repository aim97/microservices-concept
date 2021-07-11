import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const Comment = ({content, status}) => {
  const msg = status === 'pending'? 'Bending Moderation ...': content;
  return (<ListItem>
    <ListItemIcon>
      <SubdirectoryArrowRightIcon />
    </ListItemIcon>
    <ListItemText
      primary={msg}
    />
  </ListItem>);
};

export default Comment;