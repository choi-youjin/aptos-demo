interface AppFooterProps {
    className?: string;
}

const AppFooter = ({ className = '' }: AppFooterProps) => {
    return (
        <footer className={`bg-primary text-on_primary px-card_padding_x py-10 ${className}`}>
            <a target="_blank" rel="noopener noreferrer" href="https://www.favoritemedium.com/" className="inline-flex items-center gap-x-3 rounded-card_xs bg-link px-3 py-2 Transition_500 transition-opacity hover:opacity-70">
                <span className="Font_body_xs">Powered by</span>
                <img className="w-14" src="https://assets-global.website-files.com/63991543ca7c0545daa36e92/639fea28d4fdcea678cf84bc_FM_Master%20logo_RGB_Desktop.svg" />
                </a>
            
            <div className="flex justify-between mt-10">
                <span className="Font_caption_xs text-caption_on_primary">© 2024 Siam Commercial Bank</span>
                <span className="Font_body_xs text-on_primary">Terms of Use</span>
            </div>
        </footer>
    )
}

export default AppFooter;