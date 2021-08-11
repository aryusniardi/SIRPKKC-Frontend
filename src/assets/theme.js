/* eslint-disable */

import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createTheme({
    overrides: {
        MuiPaper: {
            elevation1: {
                WebkitBoxShadow: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 4px 0px, rgba(0, 0, 0, 0.1) 0px 4px 24px 0px',
                backgroundColor: '#fff',
                borderRadius: '.5rem'
            }
        },
        MuiCard: {
            root: {
                WebkitBoxShadow: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 4px 0px, rgba(0, 0, 0, 0.1) 0px 4px 24px 0px',
                borderRadius: '.5rem'
            }
        },
        MuiButton: {
            containedPrimary: {
                background: '#209CEE'
            }
        }
    },
    palette: {
        text: {
            primary: '#363636',
            secondary: '#4A4A4A',
        },
        primary: {
            main: '#1ee894',
        },
        secondary: {
            main: '#f17105',
        },
        success: {
            main: '##19E374'
        },
        info: {
            main: '#1a8fe3'
        },
        warning: {
            main: '#E6C229'
        },
        error: {
            main: '#d11149'
        },
    },
    status: {
        success: '#48C774',
        info: '#209CEE',
        warning: '#FFDD57',
        danger: 'FF3860'
    },
})

theme = responsiveFontSizes(theme)

export default theme