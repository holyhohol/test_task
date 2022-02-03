import React, { useEffect } from "react";
import { Alert, Container, Spinner, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listUsersAdmin } from "../redux/actions/adminActions";
import { formatDate } from "../components/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUsersList = useSelector((state) => state.adminUsersList);
  const { loading, error, users } = adminUsersList;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    } else {
      dispatch(listUsersAdmin());
    }
  }, []);

  return (
    <Container>
      <h1>Users List</h1>
      {error && <Alert>{error}</Alert>}

      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        users && (
          <Table striped hover>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Last Login</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.username}</td>
                    <td>
                      {user.last_login ? formatDate(user.last_login) : "-"}
                    </td>
                    <td>
                      <Button
                        as="button"
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )
      )}
    </Container>
  );
}

export default Admin;
