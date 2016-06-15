'use strict';

import mongoose from 'mongoose';

var VrfSchema = new mongoose.Schema({
  title: String,			// VRF title
  from: String,				// Requested by
  for: String,				// Game franchise
  date: Date,					// Date requested
	due: Date,					// Date due
	body: String,				// Message body
  notes: [						// Notes from VidProd
		{
			author: String,
			body: String,
			important: Boolean
		}
	],
	onit: [
		String
	],
  active: Boolean			// In progress
});

export default mongoose.model('Vrf', VrfSchema);