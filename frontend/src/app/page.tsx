'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import About from "@/app/about";
import People from "@/app/people";
import Places from "@/app/places";
import Projects from "@/app/projects";

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <main>
          <Projects />
          <About />
          <People />
          <Places />
        </main>
      </div>
    </ApolloProvider>
  );
}
