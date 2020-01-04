import React, { useState , useContext} from "react"
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../untils/hooks";
import { AuthContext  } from "./../untils/auth";

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
    });

    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
            _,
            {
                data: { login: userData }
            }
        ) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
          },
        variables: values
    });

    function loginUserCallback() {
        LoginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={(e) => onSubmit(e)} noValidate className={loading ? 'loading' : ''}>
                <h1 >Hãy đăng nhập bằng mã code ở phía sau cuốn sách của bạn</h1>
                <Form.Input
                    label="Code"
                    placeholder="Code"
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={(e) => onChange(e)}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">{
                        Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))
                    }</ul>
                </div>

            )}
        </div>

    )
}
const LOGIN_USER = gql`
    mutation login(
        $username : String!
    ){
        login(
            username : $username  
        ){
            id 
            username
        }
    }
`
export default Login