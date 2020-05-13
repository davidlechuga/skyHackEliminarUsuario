import React, { Component, Fragment } from 'react';
import { USUARIO_QUERY } from '../queries';
import { Query } from 'react-apollo';
import { MODIFICAR_USUARIO } from '../mutations/index';

//componentes
import Editarform from '../components/Editarform';

class Editar extends Component {
	state = {};

	render() {
		const { id } = this.props.match.params;
		// console.log(id);

		return (
			<Fragment>
				<h1 className="text-center"> Editar Cliente </h1>;
				<div className="row justify-content-center">
					<Query query={USUARIO_QUERY} variables={{ id }} refetchQueries={MODIFICAR_USUARIO}>
						{({ loading, error, data, refetch }) => {
							if (loading) return 'cargando..';
							if (error) return `Error: ${error.message}`;
							// console.log(data);
							// console.log(this.props);

							return <Editarform usuario={data.getUsuario} id refetch={refetch} />;
						}}
					</Query>
				</div>
			</Fragment>
		);
	}
}

export default Editar;
