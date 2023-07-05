/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDateTime: { input: Date; output: Date; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: any; output: any; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: any; output: any; }
  AWSTime: { input: any; output: any; }
  AWSTimestamp: { input: string; output: string; }
  AWSURL: { input: string; output: string; }
  BigInt: { input: any; output: any; }
  Double: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  stories?: Maybe<Array<Maybe<Story>>>;
  swapiPeople?: Maybe<SwapiPeople>;
  test?: Maybe<Story>;
};


export type QuerySwapiPeopleArgs = {
  params: QuerySwapiPeopleInput;
};


export type QueryTestArgs = {
  sport?: InputMaybe<Sports>;
};

export type QuerySwapiPeopleInput = {
  id: Scalars['String']['input'];
};

export enum Sports {
  Baseball = 'BASEBALL',
  Basketball = 'BASKETBALL',
  CrossCountry = 'CROSS_COUNTRY'
}

export type SwapiPeople = {
  __typename?: 'SWAPIPeople';
  height?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Story = {
  __typename?: 'Story';
  email?: Maybe<Scalars['AWSEmail']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sport?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']['output']>;
  AWSEmail: ResolverTypeWrapper<Scalars['AWSEmail']['output']>;
  AWSIPAddress: ResolverTypeWrapper<Scalars['AWSIPAddress']['output']>;
  AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']['output']>;
  AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']['output']>;
  AWSTime: ResolverTypeWrapper<Scalars['AWSTime']['output']>;
  AWSTimestamp: ResolverTypeWrapper<Scalars['AWSTimestamp']['output']>;
  AWSURL: ResolverTypeWrapper<Scalars['AWSURL']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Double: ResolverTypeWrapper<Scalars['Double']['output']>;
  Query: ResolverTypeWrapper<{}>;
  QuerySwapiPeopleInput: QuerySwapiPeopleInput;
  SPORTS: Sports;
  SWAPIPeople: ResolverTypeWrapper<SwapiPeople>;
  Story: ResolverTypeWrapper<Story>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AWSDateTime: Scalars['AWSDateTime']['output'];
  AWSEmail: Scalars['AWSEmail']['output'];
  AWSIPAddress: Scalars['AWSIPAddress']['output'];
  AWSJSON: Scalars['AWSJSON']['output'];
  AWSPhone: Scalars['AWSPhone']['output'];
  AWSTime: Scalars['AWSTime']['output'];
  AWSTimestamp: Scalars['AWSTimestamp']['output'];
  AWSURL: Scalars['AWSURL']['output'];
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Double: Scalars['Double']['output'];
  Query: {};
  QuerySwapiPeopleInput: QuerySwapiPeopleInput;
  SWAPIPeople: SwapiPeople;
  Story: Story;
  String: Scalars['String']['output'];
};

export type Aws_Api_KeyDirectiveArgs = { };

export type Aws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Api_KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_AuthDirectiveArgs = {
  cognito_groups: Array<Scalars['String']['input']>;
};

export type Aws_AuthDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_Cognito_User_PoolsDirectiveArgs = {
  cognito_groups?: Maybe<Array<Scalars['String']['input']>>;
};

export type Aws_Cognito_User_PoolsDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Cognito_User_PoolsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_IamDirectiveArgs = { };

export type Aws_IamDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_IamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_OidcDirectiveArgs = { };

export type Aws_OidcDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_OidcDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_SubscribeDirectiveArgs = {
  mutations: Array<Scalars['String']['input']>;
};

export type Aws_SubscribeDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_SubscribeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface AwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDateTime'], any> {
  name: 'AWSDateTime';
}

export interface AwsEmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSEmail'], any> {
  name: 'AWSEmail';
}

export interface AwsipAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSIPAddress'], any> {
  name: 'AWSIPAddress';
}

export interface AwsjsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSJSON'], any> {
  name: 'AWSJSON';
}

export interface AwsPhoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSPhone'], any> {
  name: 'AWSPhone';
}

export interface AwsTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTime'], any> {
  name: 'AWSTime';
}

export interface AwsTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTimestamp'], any> {
  name: 'AWSTimestamp';
}

export interface AwsurlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSURL'], any> {
  name: 'AWSURL';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DoubleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Double'], any> {
  name: 'Double';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  stories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Story']>>>, ParentType, ContextType>;
  swapiPeople?: Resolver<Maybe<ResolversTypes['SWAPIPeople']>, ParentType, ContextType, RequireFields<QuerySwapiPeopleArgs, 'params'>>;
  test?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType, Partial<QueryTestArgs>>;
};

export type SwapiPeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['SWAPIPeople'] = ResolversParentTypes['SWAPIPeople']> = {
  height?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']> = {
  email?: Resolver<Maybe<ResolversTypes['AWSEmail']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sport?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AWSDateTime?: GraphQLScalarType;
  AWSEmail?: GraphQLScalarType;
  AWSIPAddress?: GraphQLScalarType;
  AWSJSON?: GraphQLScalarType;
  AWSPhone?: GraphQLScalarType;
  AWSTime?: GraphQLScalarType;
  AWSTimestamp?: GraphQLScalarType;
  AWSURL?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Double?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  SWAPIPeople?: SwapiPeopleResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  aws_api_key?: Aws_Api_KeyDirectiveResolver<any, any, ContextType>;
  aws_auth?: Aws_AuthDirectiveResolver<any, any, ContextType>;
  aws_cognito_user_pools?: Aws_Cognito_User_PoolsDirectiveResolver<any, any, ContextType>;
  aws_iam?: Aws_IamDirectiveResolver<any, any, ContextType>;
  aws_oidc?: Aws_OidcDirectiveResolver<any, any, ContextType>;
  aws_subscribe?: Aws_SubscribeDirectiveResolver<any, any, ContextType>;
};
