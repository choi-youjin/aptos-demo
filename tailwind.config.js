import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      primary: ['Poppins', ...defaultTheme.fontFamily.sans],
      num: ['"Azeret Mono"', 'monospace', ...defaultTheme.fontFamily.mono],
    },
    colors: {
        transparent: 'transparent',
        /* color tokens */
        black: 'var(--color-black)',
        black_o70: 'var(--color-black-o70)',
        black_o35: 'var(--color-black-o35)',
        black_o10: 'var(--color-black-o10)',
        white: 'var(--color-white)',
        white_o70: 'var(--color-white-o70)',
        white_o35: 'var(--color-white-o35)',
        white_o10: 'var(--color-white-o10)',
        /* app colors */
        primary: 'var(--color-primary)',
        primary_variant_dark: 'var(--color-primary-variant-dark)',
        primary_variant_light: 'var(--color-primary-variant-light)',
        primary_line: 'var(--color-primary)',
        primary_line_light: 'var(--color-primary-variant-light)',
        primary_line_dark: 'var(--color-primary-variant-dark)',
        on_primary: 'var(--color-white)',
        ground: 'var(--color-ground)',
        ground_elevated: 'var(--color-ground-elevated)',
        ground_hover: 'var(--color-primary-o10)',
        on_ground: 'var(--color-on_ground)',
        body: 'var(--color-body)',
        caption: 'var(--color-purple400)',
        caption_on_primary: 'var(--color-purple400)',
        placeholder: 'var(--color-gray500)',
        line: 'var(--color-purple100)',
        divider: 'var(--color-gray800)',
        glass: 'var(--color-glass)',
        scrollbar: 'var(--color-gray700)',
        link: 'var(--color-purple400)',
        /* semantic colors */
        disabled: 'var(--color-gray300-o40)',
        semantic_danger: 'var(--color-red400)',
        semantic_danger_ground: 'var(--color-red900)',
        semantic_danger_backdrop: 'var(--color-red400-o35)',
        semantic_success: 'var(--color-green700)',
        semantic_success_ground: 'var(--color-green900)',
        semantic_success_backdrop: 'var(--color-green700-o35)',
        semantic_warning: 'var(--color-yellow700)',
        semantic_warning_ground: 'var(--color-yellow900)',
        semantic_info: 'var(--color-blue400)',
        semantic_info_ground: 'var(--color-blue900)',
        semantic_bull: 'var(--color-green300)',
        semantic_bear: 'var(--color-red400)',
        semantic_important: 'var(--color-red500)',
        semantic_live: 'var(--color-skyblue400)',
        semantic_live_ground: 'var(--color-skyblue900)',
        /* chain colors */
        chain_archway: '#FE4D01',
        chain_archway_ground: '#493126',
        chain_nibiru: '#C09FFF',
        chain_nibiru_ground: '#1E173D',
        chain_osmosis: '#A14298',
        chain_osmosis_ground: '#382649',
        chain_injective: '#00D1FD',
        chain_injective_ground: '#263F49',
        chain_neutron: '#83848A',
        chain_neutron_ground: '#2F2F2F',
        chain_dydx: '#6966FF',
        chain_dydx_ground: '#29293d',
    },
    borderRadius: {
      button: '9999px',
      icon: '9999px',
      tag: '9999px',
      card_lg: '32px',
      card_md: '20px',
      card_sm: '15px',
      card_xs: '10px',
      row: '6px',
      full: '9999px',
      r: '0 8px 8px 0',
      l: '8px 0 0 8px',
      none: '0',
    },
    zIndex: {
      base: 'var(--zindex-context-screen)',
      wall: 'calc(var(--zindex-context-screen) - 1)',
      overlay: 'var(--zindex-context-elevated)',
      navigation: 'var(--zindex-context-navigation)',
      top_context: 'var(--zindex-context-off_canvas)',
      instant_interaction: 'var(--zindex-context-instant-interaction)',
      hidden_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-below))',
      hidden_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-below))',
      tooltip_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-above))',
      tooltip_on_overlay: 'calc(var(--zindex-context-elevated) + var(--zindex-above))',
      tooltip_on_navigation: 'calc(var(--zindex-context-navigation) + var(--zindex-above))',
      tooltip_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-above))',
      tooltip_hidden_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-below))',
      tooltip_hidden_on_overlay: 'calc(var(--zindex-context-elevated) + var(--zindex-below))',
      tooltip_hidden_on_navigation: 'calc(var(--zindex-context-navigation) + var(--zindex-below))',
      tooltip_hidden_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-below))',
    },
    extend: {
      spacing: {
        safe_top: 'env(safe-area-inset-top, 44px)',
        safe_bottom: '36px',
        app_header_height: 'var(--size-app-header-height)',
        screen_exept_app_header: 'calc(100vh - var(--size-app-header-height))',
        app_header_padding_x: '1.375rem',
        app_header_padding_y: '2.75rem',
        bottom_sheet_max_height: 'calc(100vh - var(--size-app-header-height) - 2.25rem)',
        page_bottom: '6rem',
        page_top: 'calc(var(--size-app-header-height) + 2.25rem)',
        page_x: '10rem',
        page_x_mobile: '2rem',
        page_padding_safe_bottom: 'calc(6rem + 36px)',
        page_gap: '2.25rem',
        modal_padding_x: '1.5rem',
        modal_padding_y: '2.25rem',
        modal_gap: '1.75rem',
        modal_padding_safe_bottom: 'calc(2.25rem + 36px)',
        modal_margin_x: '2.5rem',
        modal_margin_y: '2.25rem',
        modal_height: 'calc(100vh - 4.75rem)',
        modal_width_md: '30rem',
        card_padding_x: '2rem',
        card_padding_y: '2.25rem',
        app_container: '1040px',
        popover_min_width: '12rem',
        text_input: '18rem',
      },
      backgroundImage: {
        primary_gradient: 'linear-gradient(215deg, var(--color-primary-o35) 100%, var(--color-primary-o0) 0%)',
        skeleton: 'linear-gradient(90deg, var(--color-white-o35) 0%, var(--color-white-o10) 100%)',
      },
      boxShadow: {
        semantic_danger: '0px 3.283px 5.746px 0px var(--color-red400-o35)',
      },
      dropShadow: {
        primary: '1px 4px 14px var(--color-primary-variant-soft-o)',
        primary_sm: '1px 0px 2px var(--color-primary-variant-soft-o)',
        semantic_danger: '0px 3.283px 5.746px var(--color-red400-o35)',
      },
      transitionProperty: {
        filter: 'filter',
      },
      transitionTimingFunction: {
        momentum: 'cubic-bezier(0.73, 0, 0, 1)',
      },
      keyframes: {
        fast_in_y: {
          '0%': {
            transform: 'translateY(140%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        fast_in_y_back: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(140%)',
          },
        },
        fast_in_x: {
          '0%': {
            transform: 'translateX(140%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fast_in_x_back: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(140%)',
          },
        },
        fade_in: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        fade_in_reverse: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        fade_in_x: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-0.5rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        fade_in_x_reverse: {
          '0%': {
            opacity: 0,
            transform: 'translateX(0.5rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        fade_out: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        up: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-0.125rem)',
          },
        },
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fast_in_y: 'fast_in_y 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_y_back: 'fast_in_y_back 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_x: 'fast_in_x 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_x_back: 'fast_in_x_back 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fade_in: 'fade_in 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        fade_out: 'fade_in_reverse 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        fade_in_x: 'fade_in_x 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        fade_in_x_reverse: 'fade_in_x_reverse 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        // fade_out: 'fade_out 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        bouncing: 'up 0.4s ease-in-out infinite alternate',
        bouncing_delayed_1: 'up 0.4s ease-in-out 0.1s infinite alternate',
        bouncing_delayed_2: 'up 0.4s ease-in-out 0.2s infinite alternate',
        bouncing_delayed_3: 'up 0.4s ease-in-out 0.3s infinite alternate',
        bouncing_delayed_4: 'up 0.4s ease-in-out 0.4s infinite alternate',
        spinning: 'rotate360 1s cubic-bezier(0.83, 0, 0.17, 1) infinite',
      },
    },
  },
  plugins: [],
};
