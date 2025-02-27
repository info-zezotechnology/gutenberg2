/**
 * Internal dependencies
 */
import {
	getTypographyFontSizeValue,
	getFluidTypographyOptionsFromSettings,
} from '../typography-utils';

describe( 'typography utils', () => {
	describe( 'getTypographyFontSizeValue', () => {
		[
			{
				message:
					'should return value when fluid typography is not active',
				preset: {
					size: '28px',
				},
				typographySettings: undefined,
				expected: '28px',
			},

			{
				message: 'should return value where font size is 0',
				preset: {
					size: 0,
				},
				typographySettings: undefined,
				expected: 0,
			},

			{
				message: "should return value where font size is '0'",
				preset: {
					size: '0',
				},
				typographySettings: undefined,
				expected: '0',
			},

			{
				message: 'should return value where `size` is `null`.',
				preset: {
					size: null,
				},
				typographySettings: null,
				expected: null,
			},

			{
				message: 'should return value when fluid is `false`',
				preset: {
					size: '28px',
					fluid: false,
				},
				typographySettings: {
					fluid: true,
				},
				expected: '28px',
			},

			{
				message: 'should return already clamped value',
				preset: {
					size: 'clamp(21px, 1.313rem + ((1vw - 7.68px) * 2.524), 42px)',
					fluid: false,
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(21px, 1.313rem + ((1vw - 7.68px) * 2.524), 42px)',
			},

			{
				message: 'should return value with unsupported unit',
				preset: {
					size: '1000%',
					fluid: false,
				},
				typographySettings: {
					fluid: true,
				},
				expected: '1000%',
			},

			{
				message: 'should return clamp value with rem min and max units',
				preset: {
					size: '1.75rem',
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(1.119rem, 1.119rem + ((1vw - 0.2rem) * 0.789), 1.75rem)',
			},

			{
				message: 'should return clamp value with em min and max units',
				preset: {
					size: '1.75em',
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(1.119em, 1.119rem + ((1vw - 0.2em) * 0.789), 1.75em)',
			},

			{
				message: 'should return clamp value for floats',
				preset: {
					size: '70.175px',
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(37.897px, 2.369rem + ((1vw - 3.2px) * 2.522), 70.175px)',
			},

			{
				message:
					'should coerce integer to `px` and returns clamp value',
				preset: {
					size: 33,
					fluid: true,
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(20.515px, 1.282rem + ((1vw - 3.2px) * 0.975), 33px)',
			},

			{
				message: 'should coerce float to `px` and returns clamp value',
				preset: {
					size: 70.175,
					fluid: true,
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(37.897px, 2.369rem + ((1vw - 3.2px) * 2.522), 70.175px)',
			},

			{
				message:
					'should return clamp value when `fluid` is empty array',
				preset: {
					size: '28px',
					fluid: [],
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 0.789), 28px)',
			},

			{
				message: 'should return clamp value when `fluid` is `null`',
				preset: {
					size: '28px',
					fluid: null,
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 0.789), 28px)',
			},

			{
				message:
					'returns clamp value where min and max fluid values defined',
				preset: {
					size: '80px',
					fluid: {
						min: '70px',
						max: '125px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(70px, 4.375rem + ((1vw - 3.2px) * 4.297), 125px)',
			},

			{
				message:
					'should apply maxViewportWidth as maximum viewport width',
				preset: {
					size: '80px',
					fluid: {
						min: '70px',
						max: '125px',
					},
				},
				typographySettings: {
					fluid: {
						maxViewportWidth: '1100px',
					},
				},
				expected:
					'clamp(70px, 4.375rem + ((1vw - 3.2px) * 7.051), 125px)',
			},

			{
				message: 'returns clamp value where max is equal to size',
				preset: {
					size: '7.8125rem',
					fluid: {
						min: '4.375rem',
						max: '7.8125rem',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(4.375rem, 4.375rem + ((1vw - 0.2rem) * 4.298), 7.8125rem)',
			},

			{
				message:
					'should return clamp value if min font size is greater than max',
				preset: {
					size: '3rem',
					fluid: {
						min: '5rem',
						max: '32px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected: 'clamp(5rem, 5rem + ((1vw - 0.2rem) * -3.75), 32px)',
			},

			{
				message: 'should return value with invalid min/max fluid units',
				preset: {
					size: '10em',
					fluid: {
						min: '20vw',
						max: '50%',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected: '10em',
			},

			{
				message:
					'should return value when size is < lower bounds and no fluid min/max set',
				preset: {
					size: '3px',
				},
				typographySettings: {
					fluid: true,
				},
				expected: '3px',
			},

			{
				message:
					'should return value when size is equal to lower bounds and no fluid min/max set',
				preset: {
					size: '14px',
				},
				typographySettings: {
					fluid: true,
				},
				expected: '14px',
			},

			{
				message:
					'should return clamp value with different min max units',
				preset: {
					size: '28px',
					fluid: {
						min: '20px',
						max: '50rem',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(20px, 1.25rem + ((1vw - 3.2px) * 60.938), 50rem)',
			},

			{
				message:
					'should return clamp value where no fluid max size is set',
				preset: {
					size: '50px',
					fluid: {
						min: '2.6rem',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(2.6rem, 2.6rem + ((1vw - 0.2rem) * 0.656), 50px)',
			},

			{
				message:
					'should return clamp value where no fluid min size is set',
				preset: {
					size: '28px',
					fluid: {
						max: '80px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 4.851), 80px)',
			},

			{
				message:
					'should not apply lower bound test when fluid values are set',
				preset: {
					size: '1.5rem',
					fluid: {
						min: '0.5rem',
						max: '5rem',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(0.5rem, 0.5rem + ((1vw - 0.2rem) * 5.625), 5rem)',
			},

			{
				message:
					'should not apply lower bound test when only fluid min is set',
				preset: {
					size: '20px',
					fluid: {
						min: '12px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(12px, 0.75rem + ((1vw - 3.2px) * 0.625), 20px)',
			},

			{
				message:
					'should not apply lower bound test when only fluid max is set',
				preset: {
					size: '0.875rem',
					fluid: {
						max: '20rem',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(0.875rem, 0.875rem + ((1vw - 0.2rem) * 23.906), 20rem)',
			},

			{
				message:
					'should return clamp value when min and max font sizes are equal',
				preset: {
					size: '4rem',
					fluid: {
						min: '30px',
						max: '30px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected: 'clamp(30px, 1.875rem + ((1vw - 3.2px) * 1), 30px)',
			},

			{
				message:
					'should use default min font size value where min font size unit in fluid config is not supported',
				preset: {
					size: '15px',
				},
				typographySettings: {
					fluid: {
						minFontSize: '16%',
					},
				},
				expected:
					'clamp(14px, 0.875rem + ((1vw - 3.2px) * 0.078), 15px)',
			},

			// Equivalent custom config PHP unit tests in `test_should_covert_font_sizes_to_fluid_values()`.
			{
				message: 'should return clamp value using custom fluid config',
				preset: {
					size: '17px',
				},
				typographySettings: {
					fluid: {
						minFontSize: '16px',
					},
				},
				expected: 'clamp(16px, 1rem + ((1vw - 3.2px) * 0.078), 17px)',
			},

			{
				message:
					'should return value when font size <= custom min font size bound',
				preset: {
					size: '15px',
				},
				typographySettings: {
					fluid: {
						minFontSize: '16px',
					},
				},
				expected: '15px',
			},

			{
				message:
					'should apply scaled min font size for em values when custom min font size is not set',
				preset: {
					size: '12rem',
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(5.174rem, 5.174rem + ((1vw - 0.2rem) * 8.533), 12rem)',
			},

			{
				message:
					'should apply scaled min font size for px values when custom min font size is not set',
				preset: {
					size: '200px',
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(85.342px, 5.334rem + ((1vw - 3.2px) * 8.958), 200px)',
			},

			{
				message:
					'should not apply scaled min font size for minimum font size when custom min font size is set',
				preset: {
					size: '200px',
					fluid: {
						min: '100px',
					},
				},
				typographySettings: {
					fluid: true,
				},
				expected:
					'clamp(100px, 6.25rem + ((1vw - 3.2px) * 7.813), 200px)',
			},
		].forEach( ( { message, preset, typographySettings, expected } ) => {
			it( `${ message }`, () => {
				expect(
					getTypographyFontSizeValue( preset, typographySettings )
				).toBe( expected );
			} );
		} );
	} );

	describe( 'typography utils', () => {
		[
			{
				message:
					'should return `undefined` when settings is `undefined`',
				settings: undefined,
				expected: { fluid: undefined },
			},

			{
				message:
					'should return `undefined` when typography is `undefined`',
				settings: {},
				expected: { fluid: undefined },
			},

			{
				message:
					'should return `undefined` when typography.fluid is `undefined`',
				settings: { typography: {} },
				expected: { fluid: undefined },
			},

			{
				message:
					'should return `false` when typography.fluid is disabled by `false`',
				settings: { typography: { fluid: false } },
				expected: { fluid: false },
			},

			{
				message: 'should return `{}` when typography.fluid is empty',
				settings: { typography: { fluid: {} } },
				expected: { fluid: {} },
			},

			{
				message:
					'should return false when typography.fluid is disabled and layout.wideSize is defined',
				settings: {
					typography: { fluid: false },
					layout: { wideSize: '1000rem' },
				},
				expected: { fluid: false },
			},

			{
				message:
					'should return true when fluid is enabled by a boolean',
				settings: { typography: { fluid: true } },
				expected: { fluid: true },
			},

			{
				message:
					'should return fluid settings with merged `layout.wideSize`d',
				settings: {
					typography: { fluid: { minFontSize: '16px' } },
					layout: { wideSize: '1000rem' },
				},
				expected: {
					fluid: { maxViewportWidth: '1000rem', minFontSize: '16px' },
				},
			},

			{
				message:
					'should prioritize fluid `maxViewportWidth` over `layout.wideSize`',
				settings: {
					typography: { fluid: { maxViewportWidth: '10px' } },
					layout: { wideSize: '1000rem' },
				},
				expected: { fluid: { maxViewportWidth: '10px' } },
			},
		].forEach( ( { message, settings, expected } ) => {
			it( `${ message }`, () => {
				expect(
					getFluidTypographyOptionsFromSettings( settings )
				).toEqual( expected );
			} );
		} );
	} );
} );
