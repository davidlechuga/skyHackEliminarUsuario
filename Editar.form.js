import React, { Component } from 'react';
import '../pages/style/CrearUsuarios.css';
import { Mutation } from 'react-apollo';
import { MODIFICAR_USUARIO } from '../mutations/index';
import { withRouter } from 'react-router-dom';

class Editarform extends Component {
	state = {
		usuario: this.props.usuario,
		emails: this.props.usuario.emails
	};

	//funciones
	nuevoCampo = () => {
		// console.log('haz hecho click');
		this.setState({
			emails: this.state.emails.concat([ { email: '' } ])
		});
	};

	quitarCampo = (i) => () => {
		// console.log(`presionaste el eliminar ${i}`);
		this.setState({
			emails: this.state.emails.filter((email, index) => i !== index)
		});
	};

	leerCampo = (i) => (e) => {
		// console.log(i);
		// console.log(e.target.value);
		const nuevoEmail = this.state.emails.map((email, index) => {
			if (i !== index) return email;
			return {
				...email,
				email: e.target.value
			};
		});
		this.setState({
			emails: nuevoEmail
		});
	};

	render() {
		const { nombre, apellido, empresa, edad, tipo } = this.state.usuario;
		const { emails } = this.state;
		// console.log(this.props);

		return (
			<Mutation
				mutation={MODIFICAR_USUARIO}
				onCompleted={() =>
					this.props.refetch().then(() => {
						this.props.history.push('/');
					})}
			>
				{(modificarUsuario) => (
					<form
						className="m-5 col-md-8"
						onSubmit={(e) => {
							e.preventDefault();
							const { id, nombre, apellido, empresa, tipo, edad } = this.state.usuario;
							const { emails } = this.state;
							console.log(id);

							const input = {
								id,
								nombre,
								apellido,
								empresa,
								edad: Number(edad),
								tipo,
								emails
							};
							console.log(input);

							modificarUsuario({
								variables: { input }
							});
						}}
					>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label> Nombre </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									name="nombre"
									defaultValue={nombre}
									onChange={(e) => {
										this.setState({
											usuario: {
												...this.state.usuario,
												nombre: e.target.value
											}
										});
									}}
									// value lo convierte de no controlados a controlados
								/>
							</div>

							<div className="form-group col-md-6">
								<label> Apellidos </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									defaultValue={apellido}
									name="apellido"
									onChange={(e) => {
										this.setState({
											usuario: {
												...this.state.usuario,
												apellido: e.target.value
											}
										});
									}}
								/>
							</div>

							{emails.map((input, index) => (
								<div key={index} className="form-group col-md-12">
									<label> Correo {index + 1} : </label>
									<div className="input-group">
										<input
											onChange={this.leerCampo(index)}
											type="email"
											placeholder="Email"
											className="form-control"
											defaultValue={input.email}
										/>
										<div className="input-group-append">
											<button
												type="button"
												onClick={this.quitarCampo(index)}
												className="btn btn-danger"
											>
												&times; Eliminar
											</button>
										</div>
									</div>
								</div>
							))}

							<div className="form-group d-flex justify-content-center col-md-12">
								<button onClick={this.nuevoCampo} type="button" className="btn btn-warning">
									+ Agregar Email
								</button>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-12">
								<label> Empresa </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									defaultValue={empresa}
									name="empresa"
									onChange={(e) => {
										this.setState({
											usuario: {
												...this.state.usuario,
												empresa: e.target.value
											}
										});
									}}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-12">
								<label> Edad</label>
								<input
									className="form-control"
									type="number"
									autoComplete="off"
									defaultValue={edad}
									name="edad"
									onChange={(e) => {
										this.setState({
											usuario: {
												...this.state.usuario,
												edad: e.target.value
											}
										});
									}}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-12">
								<label> tipo de Usuario </label>
								<select
									className="form-control"
									value={tipo}
									onChange={(e) => {
										this.setState({
											usuario: {
												...this.state.usuario,
												tipo: e.target.value
											}
										});
									}}
								>
									<option value="Unam"> Unam</option>
									<option value="Externo"> Externo</option>
									<option value="Otro">Otro </option>
								</select>
							</div>
						</div>
						<button type="submit" className="btn btn-primary">
							Guardar Cambios
						</button>
					</form>
				)}
			</Mutation>
		);
	}
}

export default withRouter(Editarform);
