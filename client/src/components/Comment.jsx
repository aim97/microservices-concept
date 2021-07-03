import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const Comment = ({content}) => {
  return (<ListItem>
    <ListItemIcon>
      <SubdirectoryArrowRightIcon />
    </ListItemIcon>
    <ListItemText
      primary={content}
    />
  </ListItem>);
};

export default Comment;