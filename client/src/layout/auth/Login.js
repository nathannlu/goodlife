import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

const Login = props => {
	const [user, setUser] = useState({email: '', password: ''});
	const [errors, setErrors] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    
    setUser({ ...user, [name]: value });
  }

	const onSubmit = e => {
		e.preventDefault();
		
		props.loginUser(user);
	}

	useEffect(() => {
		if(props.auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	}, [props])

	useEffect(() => {
		if(props.errors) {
			setErrors(props.errors);
		}
	}, [props.errors])

	useEffect(() => {
		if(props.auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	}, [])

	return (
		<div className="h-screen flex flex-wrap">
			<Helmet>
				<title>Login</title>
			</Helmet>
			<div className="w-1/3" style={{backgroundImage: 'url(/splash.png)', backgroundSize: 'cover', filter: 'grayscale(100%)'}}></div>	
			<div className="w-2/3 pb-24" style={{backgroundColor: '#f6f6f4'}}>
				<div className="w-1/3 mx-auto flex flex-wrap h-full items-center">
					<div className="w-full">	
						<h2 className="mb-4">Log In</h2>
						<p className="mb-12">
							Need an account? <Link className="link" to="/register">Sign up here</Link>
						</p>

						<form noValidate onSubmit={onSubmit}>
							<div className="mb-8">
								<label className="block mb-4 font-bold" htmlFor="email">Email</label>
								<input 
									onChange={onChange}
									value={user.email}
									id="email"
									name="email"
									type="email"
									className={classnames("", {
										invalid: errors.name
									})}
								/>
								<span>
									{errors.email}
									{errors.emailnotfound}
								</span>
							</div>

							<div className="mb-16">
								<label className="block mb-4 font-bold" htmlFor="password">Password</label>
								<input 
									onChange={onChange}
									value={user.password}
									id="password"
									name="password"
									type="password"
									className={classnames("", {
										invalid: errors.password || errors.passwordincorrect
									})}
								/>
								<span>
									{errors.password}
									{errors.passwordincorrect}
								</span>
							</div>
							
							<button className="btn btn-primary w-full">Login</button>
						</form>
					</div>
				</div>
			</div>	
		</div>
	)
};

Login.propTypes ={
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
