export function TopBar() {
	const message = "50% Cashback for TRT Women Accounts | Free Shipping on App | T&Cs Apply";

	return (
		<div className="border-b border-black/5 bg-[var(--header)] py-1 text-[10px] font-semibold tracking-wide text-white sm:py-1.5 sm:text-sm">
			<div className="announcement-mask">
				<div className="announcement-track">
					<span className="announcement-item">
						<span className="text-violet-300">♥</span>
						{message}
					</span>
					<span className="announcement-item" aria-hidden="true">
						<span className="text-violet-300">♥</span>
						{message}
					</span>
				</div>
			</div>
		</div>
	);
}
