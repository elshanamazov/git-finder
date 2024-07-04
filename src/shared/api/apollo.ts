import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';

const httpLink = new HttpLink({
	uri: 'https://api.github.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
	const token: string = import.meta.env.VITE_GITHUB_TOKEN || '';
	operation.setContext({
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return forward(operation);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
