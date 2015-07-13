var helperIs = require('../helper-is.js');

var chai = require('chai')
,	sinon = require('sinon')
,	h = require('handlebars');
h.registerHelper('is', helperIs)
chai.should();

var c = function (template, data) {
	data = data || {};
	return h.compile(template)(data);
};

describe('#is', function () {
	describe('with two arguments', function () {
		it('passes when both arguments match loosely', function(){
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('Y');
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('Y');
		});

		it('fails when both arguments do not match', function(){
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('');
		});
	});

	describe('with three arguments', function () {
		it('throws an error when an operator does not exist', function () {
			(function () { c('{{#is foo "/" bar}}Y{{/is}}', {foo:'x', bar:'y'}) })
				.should.throw('Unknown operator "/"');
		});

		describe('the not operator', function () {
			it('passes when the main arguments do not match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when the main arguments match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});

		describe('the === operator', function () {
			it('passes when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('');
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});

		describe('the !== operator', function () {
			it('passes when both arguments are not the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('Y');
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('');
			});
		});

		describe('the in operator', function () {
			describe('with an array', function () {
				it('passes when left arg is in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:['a','foo','b']})
						.should.equal('Y');
				});

				it('fails when left arg is not in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:['a','b']})
						.should.equal('');
				});
			});
			describe('with a comma separated list', function () {
				it('passes when left arg is in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:'a,b,foo,c'})
						.should.equal('Y');
				});

				it('fails when left arg is not in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:'a,b,c'})
						.should.equal('');
				});
			});
		});
	});

});