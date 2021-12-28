import * as React from 'react';
import { IndexedObject } from '../utils/type';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { createEntity, reset } from '../reducer/registerReducer';
import { AppState } from '../reducer';
import { omit } from '../utils/object';
import { IRegisterModel } from '../models/register_model';
import { useState } from 'react';

export interface IRegisterProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<IndexedObject> {}

const RegisterPage: React.FC<IRegisterProps> = (props) => {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    password: '',
    errors: [] as string[],
  });
  const { updating, updateSuccess, showModel } = props;
  const history = useHistory();

  const hasError = (key: string) => {
    return state.errors.indexOf(key) !== -1;
  };

  const close = () => {
    props.reset();
  };

  const handleOk = () => {
    close();
    if (updateSuccess) {
      history.push('/login');
    }
  };

  const changeHandler = (event: IndexedObject) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const saveEntity = (event: IndexedObject) => {
    event.preventDefault();
    //VALIDATE
    const errors: string[] = [];

    //firstname
    if (state.fullName === '') {
      errors.push('fullName');
    }

    //email
    const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = expression.test(String(state.email).toLowerCase());

    if (!validEmail) {
      errors.push('email');
    }

    //email
    if (state.password.length <= 0 || state.password.length >= 20) {
      errors.push('password');
    }

    setState({
      ...state,
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      const entity = {
        ...omit('errors', state),
        login: state.email,
      } as IRegisterModel;
      props.createEntity(entity);
    }
  };

  return (
    <div className="Article">
      <div>
        <h1>Register Page</h1>
      </div>
    </div>
  );
};

const mapStateToProps = ({ register }: AppState) => ({
  updating: register.updating,
  updateSuccess: register.updateSuccess,
  showModel: register.showModel,
});

const mapDispatchToProps = { createEntity, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
