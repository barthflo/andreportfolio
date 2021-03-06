import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthGuard from '../AuthGuard';
import PublicLayout from '../Layouts/PublicLayout';
import AdminLayout from '../Layouts/AdminLayout';

const RenderRoutes = ({ routes }) => {
	return (
		<Switch>
			{routes.map((route, index) => {
				const { path, exact, component: Component } = route;
				const Layout = route.layout || Fragment;
				const Guard = route.guard || Fragment;
				return (
					<Route
						path={path}
						exact={exact}
						key={index}
						render={(props) => (
							<Guard>
								<Layout>
									{route.routes ? (
										<RenderRoutes routes={route.routes} />
									) : (
										<React.Suspense fallback={Fragment}>
											<Component {...props} />
										</React.Suspense>
									)}
								</Layout>
							</Guard>
						)}
					></Route>
				);
			})}
		</Switch>
	);
};

RenderRoutes.propTypes = {
	routes: PropTypes.array.isRequired,
};

export default RenderRoutes;

export const routes = [
	{
		path: '/403',
		exact: true,
		guard: Fragment,
		component: React.lazy(() => import('../../views/Errors/403')),
	},
	{
		path: '/404',
		exact: true,
		guard: Fragment,
		component: React.lazy(() => import('../../views/Errors/404')),
	},
	{
		path: '/500',
		exact: true,
		guard: Fragment,
		component: React.lazy(() => import('../../views/Errors/ 500')),
	},
	{
		path: '/login',
		exact: true,
		guard: Fragment,
		component: React.lazy(() => import('../../views/LoginView')),
	},
	{
		path: '/admin',
		guard: AuthGuard,
		layout: AdminLayout,
		routes: [
			{
				path: '/admin',
				exact: true,
				component: React.lazy(() => import('../../views/Admin/HomeView')),
			},
			{
				path: '/admin/settings',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/SiteSettingsEditView'),
				),
			},
			{
				path: '/admin/profile',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/ProfileEditView'),
				),
			},
			{
				path: '/admin/filmography',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/FilmographyListView'),
				),
			},
			{
				path: '/admin/filmography/create',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/FilmographyCreateView'),
				),
			},
			{
				path: '/admin/filmography/edit/:slug',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/FilmographyEditView'),
				),
			},
			{
				path: '/admin/skills',
				exact: true,
				component: React.lazy(() => import('../../views/Admin/SkillsListView')),
			},
			{
				path: '/admin/skills/create',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/SkillsCreateView'),
				),
			},
			{
				path: '/admin/skills/edit/:id',
				exact: true,
				component: React.lazy(() => import('../../views/Admin/SkillsEditView')),
			},
			{
				path: '/admin/cv',
				exact: true,
				component: React.lazy(() => import('../../views/Admin/CVEditView')),
			},
			{
				path: '/admin/messages',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/MessagesListView'),
				),
			},
			{
				path: '/admin/messages/:id',
				exact: true,
				component: React.lazy(() =>
					import('../../views/Admin/MessageDetailView'),
				),
			},
			{
				component: () => <Redirect to="/404" />,
			},
		],
	},
	{
		path: '/',
		guard: Fragment,
		layout: PublicLayout,
		routes: [
			{
				path: '/',
				exact: true,
				component: React.lazy(() => import('../../views/HomeView')),
			},
			{
				path: '/filmography',
				exact: true,
				component: React.lazy(() => import('../../views/FilmographyListView')),
			},
			{
				path: '/filmography/:slug',
				exact: false,
				component: React.lazy(() =>
					import('../../views/FilmographyDetailView'),
				),
			},
			{
				component: () => <Redirect to="/404" />,
			},
		],
	},
];
