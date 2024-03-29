import * as Types from './base';

import * as Operations from './base';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../lib/withApollo';



export async function getServerPageExportArticles
    (options: Omit<Apollo.QueryOptions<Types.ExportArticlesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ExportArticlesQuery>({ ...options, query: Operations.ExportArticlesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useExportArticles = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ExportArticlesQuery, Types.ExportArticlesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ExportArticlesDocument, options);
};
export type PageExportArticlesComp = React.FC<{data?: Types.ExportArticlesQuery, error?: Apollo.ApolloError}>;
export const withPageExportArticles = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ExportArticlesQuery, Types.ExportArticlesQueryVariables>) => (WrappedComponent:PageExportArticlesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ExportArticlesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrExportArticles = {
      getServerPage: getServerPageExportArticles,
      withPage: withPageExportArticles,
      usePage: useExportArticles,
    }
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
export async function getServerPageGetArticlesByCategory
    (options: Omit<Apollo.QueryOptions<Types.GetArticlesByCategoryQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticlesByCategoryQuery>({ ...options, query: Operations.GetArticlesByCategoryDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticlesByCategory = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesByCategoryQuery, Types.GetArticlesByCategoryQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticlesByCategoryDocument, options);
};
export type PageGetArticlesByCategoryComp = React.FC<{data?: Types.GetArticlesByCategoryQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticlesByCategory = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesByCategoryQuery, Types.GetArticlesByCategoryQueryVariables>) => (WrappedComponent:PageGetArticlesByCategoryComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticlesByCategoryDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticlesByCategory = {
      getServerPage: getServerPageGetArticlesByCategory,
      withPage: withPageGetArticlesByCategory,
      usePage: useGetArticlesByCategory,
    }
export async function getServerPageGetArticlesByTitle
    (options: Omit<Apollo.QueryOptions<Types.GetArticlesByTitleQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticlesByTitleQuery>({ ...options, query: Operations.GetArticlesByTitleDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticlesByTitle = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesByTitleQuery, Types.GetArticlesByTitleQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticlesByTitleDocument, options);
};
export type PageGetArticlesByTitleComp = React.FC<{data?: Types.GetArticlesByTitleQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticlesByTitle = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesByTitleQuery, Types.GetArticlesByTitleQueryVariables>) => (WrappedComponent:PageGetArticlesByTitleComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticlesByTitleDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticlesByTitle = {
      getServerPage: getServerPageGetArticlesByTitle,
      withPage: withPageGetArticlesByTitle,
      usePage: useGetArticlesByTitle,
    }
export async function getServerPageGetArticlesInReview
    (options: Omit<Apollo.QueryOptions<Types.GetArticlesInReviewQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetArticlesInReviewQuery>({ ...options, query: Operations.GetArticlesInReviewDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetArticlesInReview = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesInReviewQuery, Types.GetArticlesInReviewQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetArticlesInReviewDocument, options);
};
export type PageGetArticlesInReviewComp = React.FC<{data?: Types.GetArticlesInReviewQuery, error?: Apollo.ApolloError}>;
export const withPageGetArticlesInReview = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetArticlesInReviewQuery, Types.GetArticlesInReviewQueryVariables>) => (WrappedComponent:PageGetArticlesInReviewComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetArticlesInReviewDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetArticlesInReview = {
      getServerPage: getServerPageGetArticlesInReview,
      withPage: withPageGetArticlesInReview,
      usePage: useGetArticlesInReview,
    }