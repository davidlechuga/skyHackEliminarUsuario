import gql from 'graphql-tag';

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($input: UsuarioInput) {
		crearUsuario(input: $input) {
			id
			nombre
			apellido
		}
	}
`;

export const MODIFICAR_USUARIO = gql`
	mutation modificarUsuario($input: UsuarioInput) {
		modificarUsuario(input: $input) {
			id
			nombre
			apellido
			empresa
			emails {
				email
			}
			edad
			tipo
		}
	}
`;

export const ELIMINAR_USUARIO = gql`
	mutation eliminarUsuario($id: ID!) {
		eliminarUsuario(id: $id)
	}
`;
