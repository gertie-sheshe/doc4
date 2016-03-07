var fs = require('fs');

module.exports = function(icon){
	var iconStream = null;
	if(fs.existsSync(icon)){
		iconStream = fs.readFileSync(icon);
	}else{
		throw new Error('favicon.ico is not found .');
	}
	return function(req, res, next){
		if(/\/favicon\.ico$/.test(req.url)){
			res.set('Content-Type', 'image/x-icon');
			res.send(iconStream);
		}else{
			next();
		}
	}
};

