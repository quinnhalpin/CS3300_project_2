/* Stores all of the functions used for finding boolean variables in datasets*/

//PORTUGAL DATA FUNCTIONS
function hasInternet(person){
	return person.internet;
}
function hasRomance(person){
	return person.romantic;
}
function isHigher(person){
	return person.higher;
}
function hasNursery(person){
	return person.nursery;
}
function hasActivities(person){
	return person.activities;
}
function parentsApart(person){
	return person.Pstatus == "A";
}
function liveInCity(person){
	return person.address == "U";
}
//INTERNATIONAL DATA FUNCTIONS
function isMale(person){
	return person.gender;
}
function manyAbsences(person){
	return person.StudentAbsenceDays;
}
function parentsSatisfied(person){
	return person.ParentschoolSatisfaction;
}
function highGrades(person){
	return person.Class == "H";
}
function lowGrades(person){
	return person.Class == "L";
}


//ECON DATA FUNCTIONS
function econMajor(person){
	return person.econ_major;
} 
function naturalScienceMajor(person){
	return person.natural_science_major;
}
function socialScienceMajor(person){
	return person.other_social_major;
}
function humanitiesMajor(person){
	return person.humanties_major;
}
function satMathAbove600(person){
	return (person.sat >= 600) ? 1:0;
}
function satMathBelow500(person){
	return (person.sat < 500) ? 1:0;
}
function satMathAbove700(person){
	return (person.sat > 700) ? 1:0;
}
function took3MathCourses(person){
	return (person.mathcourse == 3) ? 1:0;
}

function took1MathCourses(person){
	return (person.mathcourse == 1) ? 1:0;
}
function took2MathCourses(person){
	return (person.mathcourse == 2) ? 1:0;
}

function tookNoMathCourses(person){
	return (person.mathcourse == 0) ? 1:0;
}
function took2ChemistryCourses(person){
	return (person.chemistcourse == 2) ? 1:0;
}
function knowForeignLanguage(person){
	return (person.language == 1) ? 1:0;
}
//store questions to function and short names (appear on small pie) in a global variable 
questions_data_dict = {
	"math":{
		"Does the student do extracurriculars?": [hasActivities, "Extracurriculars"],
		"Does the student live in urban environment?": [liveInCity, "Urban Area"],
		"Does the student have internet?": [hasInternet, "Internet"],
		"Is the student in a romantic relationship?": [hasRomance, "Romance"],
		"Did the student go to higher education?": [isHigher, "Higer Education"],
		"Did the student go to nursery school?": [hasNursery, "Nursery"],
		"Do the parents live apart?": [parentsApart, "Parents Apart"]
		},

	"int":{
		"Is the student male?": [isMale, "Male"],
		"Does the student have more than 7 absences?": [manyAbsences, "Many absences"],
		"Are the student's parents satisfied with their school?": [parentsSatisfied, "Parents satisfied"],
		"Does the student get high grades?": [highGrades, "High grades"],
		"Does the student get low grades?": [lowGrades, "Low grades"]
	},
	"econ":{"Is the subject male?": [isMale, "Male"],
		"Is the student an Econ Major?": [econMajor, "Econ Major"],
		"Is the student a Humanities Major?": [humanitiesMajor, "Humanities Major"],
		"Is the student a Natural Science Major?": [naturalScienceMajor, "Natural Science"],
		"Is the student a Social Science Major?": [socialScienceMajor, "Social Science"],
		"SAT Math Above 600?": [satMathAbove600, "SAT Math > 600"],
		"SAT Math Above 700?": [satMathAbove700, "SAT Math > 700"],
		"SAT Math Below 500?": [satMathBelow500, "SAT Math < 500"],
		"Took 3 Math Courses?": [took3MathCourses, "3 Math Courses"],
		"Took 1 Math Course?": [took1MathCourses, "1 Math Courses"],
		"Took 2 Math Courses?": [took2MathCourses, "2 Math Courses"],
		"Took No Math Courses?": [tookNoMathCourses, "No Math Courses"],
		"Took 2 Chemistry Courses?": [took2ChemistryCourses, "2 Chemistry Courses"],
		"Proficent in a Foreign Language?": [knowForeignLanguage, "Know Foreign Language"]
	}			
}
