import React from "react";
import { useEffect } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listUserActionsAdmin } from "../redux/actions/adminActions";
import {formatDate} from "../components/formatDate"

function AdminUsersActions() {
  const params = useParams();

  const dispatch = useDispatch();

  const userId = params.id;

  const adminUserActions = useSelector((state) => state.adminUserActions);
  const { loading, error, actions } = adminUserActions;

  useEffect(() => {
    dispatch(listUserActionsAdmin(userId));
  }, [userId, dispatch]);

  return (
    <Container>
      <h1>User {userId} Actions</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : actions && (
        <Table striped hover>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Action</td>
                    <td>Time</td>
                </tr>
            </thead>
            <tbody>
            {actions.map((action)=>{
                return(
                    <tr key={action.id}>
                        <td>{action.id}</td>
                        <td>{action.action}</td>
                        <td>{formatDate(action.action_time)}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminUsersActions;
