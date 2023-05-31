import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App.js'


describe('Background', () => {
    let app: HTMLElement | null = null;
    beforeEach( () => {
        let { container } = render(<App />);
        app = container;
        return () => {
            app = null;
        };
    });

    it('should not render the background', () => {
        expect(app?.getElementsByClassName('backdrop')).toHaveLength(0); 
    });
});
