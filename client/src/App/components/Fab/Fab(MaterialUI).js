import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import AssignmentCopyIcon from "@material-ui/icons/Assignment";
import ListIcon from "@material-ui/icons/List";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: "absolute",
        "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
        }
    },
    green: {
        background: '#4caf50',
        '&.hover': {
            background: '#4caf50'
        }
    },
    blue: {
        background: '#3d5afe',
        '&.hover': {
            background: '#3d5afe'
        }
    },
    staticTooltipLabel: {
        backgroundColor: "red"
    }
}));



const  Fab = (props) => {
    const classes = useStyles();
    const [direction] = React.useState("up");
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOrder = () => {
        props.history.push('/order')
    }
    const handleCategory = () => {
        props.history.push('/categories/new')
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const actions = [
        { icon: <ListIcon />, name: "Добавить заказ", color: classes.blue, callback: handleOrder},
        { icon: <AssignmentCopyIcon />, name: "Добавить категорию", color: classes.green, callback: handleCategory }
    ];

    return (
            <SpeedDial
                FabProps={{ color: "secondary"}}
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                hidden={false}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        FabProps={{ size: 'medium' }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.callback}
                    />
                ))}
            </SpeedDial>
    )
}
export default withRouter(Fab)