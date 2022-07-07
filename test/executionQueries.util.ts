export const MUTATION_REGISTER = `
					mutation Register($data: RegisterInput!) {
						register(data: $data) {
							user {
								_id
								email
								firstName
								lastName
								privileges
								avatar
							}
							accessToken
							errors {
								field
								message
							}
						}
					}
				`;

export const MUTATION_LOGIN = `
					mutation Login($data: LoginInput!) {
						login(data: $data) {
							user {
								_id
								email
								firstName
								lastName
								privileges
								avatar
							}
							accessToken
							errors {
								field
								message
							}
						}	
					}
				`;

export const ME_QUERY = `
					query Me {
						me {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
				`;

export const UPDATE_ME_MUTATION = `
					mutation UpdateMe($data: UpdateUserInput!) {
						updateMe(data: $data) {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
				`;

export const DELETE_ME_MUTATION = `
					mutation DeleteMe {
						deleteMe
					}
`;

export const ADD_USER_PRIVILEGE_MUTATION = `
					mutation AddUserPrivilegesToUser($_id: String!, $data: AddUserPrivilegeInput!) {
						addUserPrivilegesToUser(_id: $_id, data: $data) {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
				`;

export const REMOVE_USER_PRIVILEGE_MUTATION = `
					mutation RemoveUserPrivilegesFromUser($_id: String!, $data: RemoveUserPrivilegeInput!) {
						removeUserPrivilegesFromUser(_id: $_id, data: $data) {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
				`;

export const GET_ALL_USERS_QUERY = `
					query GetAllUsers {
						getAllUsers {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
					`;

export const GET_USER_BY_ID_QUERY = `
					query GetUserById($_id: String!) {
						getUserById(_id: $_id) {
							_id
							email
							firstName
							lastName
							privileges
							avatar
						}
					}
					`;
