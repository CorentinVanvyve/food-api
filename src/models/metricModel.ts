import { IMetric } from "../interfaces/metricInterface";
import mongoose, { model, Schema } from "mongoose";

const MetricSchema = new mongoose.Schema({
	birth_date: {
		type: Date,
		required: [true, "Field is required"]
	},
  weight: {
		type: Number,
		required: [true, "Field is required"]
	},
  height: {
		type: Number,
		required: [true, "Field is required"]
	},
  maintenance: {
		type: Number,
		default: 0
	},
  gender: {
		type: String,
		required: [true, "Field is required"],
		enum: ['M', 'F', 'X']
	},
  user: {
	type: Schema.Types.ObjectId,
    ref: "User", // This specifies the reference to the User model
	unique: true,
    required: true,
  },
},
{
  timestamps: true
});

MetricSchema.pre('save', function(next) {

	const age =  new Date().getFullYear() - new Date(this.birth_date!).getFullYear();
	const weight = this.weight!;
	const height = this.height!;
	const gender = this.gender!;

	if (this.isModified('birth_date') || this.isModified('weight') || this.isModified('height') || this.isModified('gender')) {

		try {
			this.maintenance = setMaintenance(gender, weight, height, age);
    } catch (error) {
			console.error('Error updating maintenance:', error);
    }
  }
	next();
});


function setMaintenance(gender: string, weight: number, height: number, age: number) {
	if (gender === 'M') {
		const maintenance = (13.7516 * weight) + (500.33 * (height/100)) - (6.7550 * age) + 66.473
		return parseFloat(maintenance.toFixed(2))
	} else if (gender === 'F') {
		const maintenance = (9.5634 * weight) + (184.96 * (height/100)) - (4.6756 * age) + 655.0955
		return parseFloat(maintenance.toFixed(2))
	} else {
		const maintenanceMale = (13.7516 * weight) + (500.33 * (height/100)) - (6.7550 * age) + 66.473
		const maintenanceFemale = (9.5634 * weight) + (184.96 * (height/100)) - (4.6756 * age) + 655.0955
		const maintenance = (maintenanceMale - maintenanceFemale)/2 + maintenanceFemale
		return parseFloat(maintenance.toFixed(2))
	}
}

export const Metric = model<IMetric>("Metric", MetricSchema);
