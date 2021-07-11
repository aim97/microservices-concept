import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as R from 'ramda';

const Comment = ({content, status}) => {
  const msg = R.cond([
    [R.equals('pending'), R.always('Bending Moderation ...')],
    [R.equals('rejected'), R.always('This comment violates our policies')],
    [R.T, R.always(content)]
  ])(status);
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