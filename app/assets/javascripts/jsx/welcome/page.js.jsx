var mountNode = document.getElementById('welcomePage');

var snakeToCamel = function (s) {
  return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

var User = function (options) {
  var userObject = {};
  Object.keys(options).map(function(key) {
    userObject[snakeToCamel(key)] = options[key];
  });

  return userObject;
}

var getCardData = function (callback) {
  var request = new XMLHttpRequest();
  request.open('GET', 'api/v1/card/1.json', true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.responseText)
        callback(new User(data));
      } else {
        // Error :(
      }
    }
  };

  // request.overrideMimeType('json');
  request.send();
  request = null;
};

var avatarStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '100px',
  WebkitBorderRadius: '100px',
  MozBorderRadius: '100px'
};

var cardStyle = {
  width: '500px',
  borderColor: 'grey',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '8px',
  padding: '9px',
};

var SocialState = {
  getDisplayState: function(x) {
    return (x % 2 === 0) ? x : '-';
  }
}

var Networks = React.createClass({
  mixins: [SocialState],
  getDefaultProps: function () {
      return {
        socials: [1, 2, 3, 4, 5, 6]
      };
  },
  render: function () {
    return (
      <div>
        {this.props.socials.map(function(x) {
          return <span>[{ SocialState.getDisplayState(x) }]</span>;
        })}
      </div>
    );
  }
});

var Card = React.createClass({
  getDefaultProps: function () {
    return {
      user: {}
    };
  },

  render: function () {
    return (
      <div style={cardStyle}>
        <img style={avatarStyle} src={this.props.user.profilePicture} />
        <div>
          <span>{this.props.user.firstName}</span> <span>{this.props.user.lastName}</span>
        </div>
        <div>
          <span>{this.props.user.location}</span>
        </div>
        <Networks />
      </div>
    );
  }
});

var user = getCardData(function(user) {
  React.render(<Card user={user} />, mountNode);
});
