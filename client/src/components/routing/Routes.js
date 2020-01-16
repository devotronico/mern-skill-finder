import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import SidebarButton from '../layout/SidebarButton';
import Sidebar from '../layout/Sidebar';
import Dashboard from '../dashboard/Dashboard';
import ViewExperience from '../profile-forms/ViewExperience';
import ViewEducation from '../profile-forms/ViewEducation';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Logs from '../logs/Logs';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import PrivateRouteRole from './PrivateRouteRole';

const Routes = () => {
  return (
    <section className="wrapper">
      <Alert />
      <Sidebar />
      <SidebarButton />
      <div className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRouteRole
            exact
            path="/profiles"
            roles={['system', 'admin']}
            component={Profiles}
          />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/experience/:id" component={ViewExperience} />
          <Route exact path="/education/:id" component={ViewEducation} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <Route exact path="/logs" component={Logs} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </section>
  );
};

export default Routes;
