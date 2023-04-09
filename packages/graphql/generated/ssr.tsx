import * as Types from './base';

import * as Operations from './base';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../lib/withApollo';
export async function getServerPageGetArticleBySlug
    (options: Omit<Apollo.QueryOptions<Types.GetArticleBySlugQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticleBySlugQuery>({ ...options, query: Operations.GetArticleBySlugDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticleBySlug = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticleBySlugQuery, Types.GetArticleBySlugQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticleBySlugDocument, options);
};
export type PageGetArticleBySlugComp = React.FC<{data?: Types.GetArticleBySlugQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticleBySlug = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticleBySlugQuery, Types.GetArticleBySlugQueryVariables>) => (WrappedComponent:PageGetArticleBySlugComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticleBySlugDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticleBySlug = {
      getServerPage: getServerPageGetArticleBySlug,
      withPage: withPageGetArticleBySlug,
      usePage: useGetArticleBySlug,
    }
export async function getServerPageGetArticleByTitle
    (options: Omit<Apollo.QueryOptions<Types.GetArticleByTitleQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticleByTitleQuery>({ ...options, query: Operations.GetArticleByTitleDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticleByTitle = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticleByTitleQuery, Types.GetArticleByTitleQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticleByTitleDocument, options);
};
export type PageGetArticleByTitleComp = React.FC<{data?: Types.GetArticleByTitleQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticleByTitle = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticleByTitleQuery, Types.GetArticleByTitleQueryVariables>) => (WrappedComponent:PageGetArticleByTitleComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticleByTitleDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticleByTitle = {
      getServerPage: getServerPageGetArticleByTitle,
      withPage: withPageGetArticleByTitle,
      usePage: useGetArticleByTitle,
    }
export async function getServerPageGetArticles
    (options: Omit<Apollo.QueryOptions<Types.GetArticlesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticlesQuery>({ ...options, query: Operations.GetArticlesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticles = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesQuery, Types.GetArticlesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticlesDocument, options);
};
export type PageGetArticlesComp = React.FC<{data?: Types.GetArticlesQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticles = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesQuery, Types.GetArticlesQueryVariables>) => (WrappedComponent:PageGetArticlesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticlesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticles = {
      getServerPage: getServerPageGetArticles,
      withPage: withPageGetArticles,
      usePage: useGetArticles,
    }