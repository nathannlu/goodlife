import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';


const Register = (props) => {
	const [user, setUser] = useState({name: '', email: '', password: '', password2: ''});
	const [errors, setErrors] = useState({});	
	

  const onChange = e => {
    const { name, value } = e.target;
   	
    setUser({ ...user, [name]: value });
  }

	const onSubmit = e => {
		e.preventDefault();

		props.registerUser(user, props.history);
	}

	useEffect(() => {
		if(props.errors) {
			setErrors(props.errors);
		}
	}, [props.errors])

	return (
		<div className="h-screen flex flex-wrap">
			<Helmet>
				<title>Register</title>
			</Helmet>
			<div className="w-1/3" style={{backgroundImage: 'url(/splash.png)', backgroundSize: 'cover', filter: 'grayscale(100%)'}}></div>	
			<div className="w-2/3 pb-24" style={{backgroundColor: '#f6f6f4'}}>
				<div className="w-1/3 mx-auto flex flex-wrap h-full items-center">
					<div className="w-full">	
						<h2 className="mb-4">Create an Account</h2>
						<p className="mb-12">
							Already have an account? <Link className="link" to="/login">Log in here</Link>
						</p>

						<form noValidate onSubmit={onSubmit}>
							<div className="mb-8">
								<label className="block mb-4 font-bold" htmlFor="name">Name</label>
								<input
									onChange={onChange}
									value={user.name}
									error={errors.name}
									id="name"
									name="name"
									type="text"
									className={classnames("w-full", {
										invalid: errors.name
									})}
								/>
								<span>{errors.name}</span>
							</div>
							<div className="mb-8">
								<label className="block mb-4 font-bold" htmlFor="email">Email</label>
								<input
									onChange={onChange}
									value={user.email}
									error={errors.email}
									id="email"
									name="email"
									type="email"
									className={classnames("w-full", {
										invalid: errors.email
									})}
								/>
								<span>{errors.email}</span>
							</div>
							<div className="mb-8">
								<label className="block mb-4 font-bold" htmlFor="password">Password</label>
								<input
									onChange={onChange}
									value={user.password}
									error={errors.password}
									id="password"
									name="password"
									type="password"
									className={classnames("w-full", {
										invalid: errors.password
									})}
								/>
								<span>{errors.password}</span>
							</div>
							<div className="mb-16">
								<label className="block mb-4 font-bold" htmlFor="password2">Confirm password</label>
								<input
									onChange={onChange}
									value={user.password2}
									error={errors.password2}
									id="password2"
									name="password2"
									type="password"
									className={classnames("w-full", {
										invalid: errors.password2
									})}
								/>
								<span>{errors.password2}</span>
							</div>
							<button className="btn btn-primary w-full">Sign up</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)		
}

export default Register;

