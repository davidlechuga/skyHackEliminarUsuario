import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { USUARIOS_QUERY } from '../queries';
import { Link } from 'react-router-dom';
import { ELIMINAR_USUARIO } from '../mutations/index';

class muestra extends Component {
	render() {
		return (
			<Query query={USUARIOS_QUERY} pollInterval={1000}>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return 'cargando...';
					if (error) return `Error: ${error.message}`;
					console.log(data.getUsuarios);

					return (
						<Fragment>
							<h1 className="text-center"> Listados de Usuarios</h1>
							<ul className="list-group m-5">
								{data.getUsuarios.map((item) => {
									const { id } = item;
									return (
										<li key={item.id} className="list-group-item">
											<div className="row justify-content-between align-items-center">
												<div className="col-md-8 d-flex justify-content-between align-items-center">
													{item.nombre} {item.apellido} - {item.empresa}
												</div>
												<div className="col-md-4 d-flex jsutify-content-end">
													<Mutation mutation={ELIMINAR_USUARIO}>
														{(eliminarUsuario) => (
															<button
																className="btn btn-danger d-block d-md-inline-block mr-2"
																type="button"
																onClick={() => {
																	// console.log(id);
																	if (
																		window.confirm(
																			'¿Seguro desea eliminar este cliente?'
																		)
																	) {
																		eliminarUsuario({
																			variables: { id }
																		});
																	}
																}}
															>
																{' '}
																&times; Eliminar
															</button>
														)}
													</Mutation>
													<Link
														to={`/usuarios/editar/${item.id}`}
														className="btn btn-success d-block d-md-inline-block"
													>
														Editar Cliente
													</Link>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default muestra;
