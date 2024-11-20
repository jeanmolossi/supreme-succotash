import { cn } from '@repo/utils'

export function Wordmark({ className, ...props }: { className?: string }) {
	return (
		<svg
			width={325.2}
			height={89.3}
			viewBox="0 0 325.2 89.3"
			xmlns="http://www.w3.org/2000/svg"
			className={cn('h-6 w-auto text-black dark:text-white', className)}
			{...props}
		>
			<path
				d="M44.7 39.4L63.4 2.6q.5-.95 1.025-1.475a3.426 3.426 0 01.897-.652A3.202 3.202 0 0165.6.35q.65-.25 1.475-.3.567-.034 1.264-.045A42.933 42.933 0 0169 0h12.9v72.85H67v-41.9a71.047 71.047 0 01.095-3.589 89.629 89.629 0 01.205-3.011L48 61.8a6.955 6.955 0 01-1.133 1.619 5.926 5.926 0 01-1.292 1.031 6.519 6.519 0 01-2.817.873 8.006 8.006 0 01-.658.027h-2.3a7.212 7.212 0 01-2.086-.293 6.279 6.279 0 01-1.389-.607q-1.525-.9-2.425-2.65L14.5 24.3q.2 1.75.3 3.475.1 1.725.1 3.175v41.9H0V0h12.9a41.889 41.889 0 01.786.007q.429.008.806.025a22.569 22.569 0 01.333.018 5.604 5.604 0 01.804.105A4.322 4.322 0 0116.3.35a3.332 3.332 0 011.108.709 3.846 3.846 0 01.067.066 4.336 4.336 0 01.406.475q.192.257.38.572a9.262 9.262 0 01.239.428l18.75 36.95q1 1.9 1.925 3.95.925 2.05 1.775 4.2.85-2.2 1.8-4.275.95-2.075 1.95-4.025zM183.8 0L212 72.85h-13.1a7.752 7.752 0 01-1.597-.156q-1.05-.221-1.862-.755a4.808 4.808 0 01-.166-.114Q193.85 70.8 193.3 69.2L189 56.5h-27.7L157 69.2q-.5 1.4-1.95 2.525t-3.55 1.125h-13.2L166.5 0h17.3zm-41 21l-27.7 65.3a7.738 7.738 0 01-.542 1.008q-.323.501-.695.871a3.918 3.918 0 01-.463.396q-.908.658-2.804.719a12.372 12.372 0 01-.396.006H98.6l10-21L87.9 21h13.7q1.271 0 2.143.399a3.13 3.13 0 01.657.401 4.592 4.592 0 01.956 1.025 4.046 4.046 0 01.444.875l8.5 22.35q1.2 3.1 1.95 6.2.5-1.6 1.1-3.15.6-1.55 1.15-3.15l7.7-22.25a3.562 3.562 0 011.005-1.487 4.759 4.759 0 01.57-.438Q128.95 21 130.3 21h12.5zm90.6 68.3h-15.5V21h9.6q1.45 0 2.425.65a3.251 3.251 0 011.122 1.305 4.405 4.405 0 01.253.645l1.15 3.8q1.5-1.65 3.225-3t3.7-2.325a20.269 20.269 0 013.967-1.455 22.481 22.481 0 01.283-.07 19.521 19.521 0 013.01-.473A24.292 24.292 0 01248.6 20q4.05 0 7.5 1.8a16.966 16.966 0 015.269 4.325 20.113 20.113 0 01.681.875 23.073 23.073 0 012.458 4.274 31.149 31.149 0 011.467 4.051 35 35 0 011.112 5.607 47.288 47.288 0 01.313 5.568 36.853 36.853 0 01-.635 6.961 31.109 31.109 0 01-.99 3.839 28.92 28.92 0 01-2.539 5.68 24.755 24.755 0 01-2.011 2.92q-2.925 3.65-7 5.7a19.428 19.428 0 01-7.726 2.014 23.103 23.103 0 01-1.299.036 23.793 23.793 0 01-2.855-.162q-1.496-.181-2.762-.565a12.339 12.339 0 01-1.183-.423q-2.75-1.15-5-3.1v19.9zm57.8 0h-15.5V21h9.6q1.45 0 2.425.65a3.251 3.251 0 011.122 1.305 4.405 4.405 0 01.253.645l1.15 3.8q1.5-1.65 3.225-3t3.7-2.325a20.269 20.269 0 013.967-1.455 22.481 22.481 0 01.283-.07 19.521 19.521 0 013.01-.473A24.292 24.292 0 01306.4 20q4.05 0 7.5 1.8a16.966 16.966 0 015.269 4.325 20.113 20.113 0 01.681.875 23.073 23.073 0 012.458 4.274 31.149 31.149 0 011.467 4.051 35 35 0 011.112 5.607 47.288 47.288 0 01.313 5.568 36.853 36.853 0 01-.635 6.961 31.109 31.109 0 01-.99 3.839 28.92 28.92 0 01-2.539 5.68 24.755 24.755 0 01-2.011 2.92q-2.925 3.65-7 5.7a19.428 19.428 0 01-7.726 2.014 23.103 23.103 0 01-1.299.036 23.793 23.793 0 01-2.855-.162q-1.496-.181-2.762-.565a12.339 12.339 0 01-1.183-.423q-2.75-1.15-5-3.1v19.9zM171.9 25.15L165.2 45h19.9l-6.7-19.95q-.447-1.306-1-2.932a3154.615 3154.615 0 01-.525-1.543 105.337 105.337 0 01-1.084-3.385 129.141 129.141 0 01-.641-2.19q-.8 3.05-1.65 5.65a105.466 105.466 0 01-.623 1.852q-.318.913-.62 1.719a57.136 57.136 0 01-.357.929zm61.5 11.6v22a11.483 11.483 0 001.703 1.567 8.669 8.669 0 002.097 1.158q2.05.775 4.3.775a9.486 9.486 0 002.791-.402 8.617 8.617 0 001.159-.448 7.513 7.513 0 002.25-1.653 9.652 9.652 0 00.875-1.072 11.278 11.278 0 001.049-1.856q.604-1.331 1.026-3.019a22.652 22.652 0 00.486-2.652q.264-2.095.264-4.648 0-3.119-.347-5.486a21.997 21.997 0 00-.253-1.414q-.6-2.8-1.675-4.525a7.856 7.856 0 00-1.012-1.313 5.747 5.747 0 00-1.563-1.162 7.162 7.162 0 00-2.655-.723 8.663 8.663 0 00-.695-.027q-1.7 0-3.075.325a11.477 11.477 0 00-2.178.744 10.47 10.47 0 00-.372.181q-1.175.6-2.175 1.525a20.91 20.91 0 00-1.25 1.264 25.681 25.681 0 00-.75.861zm57.8 0v22a11.483 11.483 0 001.703 1.567A8.669 8.669 0 00295 61.475q2.05.775 4.3.775a9.486 9.486 0 002.791-.402 8.617 8.617 0 001.159-.448 7.513 7.513 0 002.25-1.653 9.652 9.652 0 00.875-1.072 11.278 11.278 0 001.049-1.856q.604-1.331 1.026-3.019a22.652 22.652 0 00.486-2.652q.264-2.095.264-4.648 0-3.119-.347-5.486a21.997 21.997 0 00-.253-1.414q-.6-2.8-1.675-4.525a7.856 7.856 0 00-1.012-1.313 5.747 5.747 0 00-1.563-1.162 7.162 7.162 0 00-2.655-.723 8.663 8.663 0 00-.695-.027q-1.7 0-3.075.325a11.477 11.477 0 00-2.178.744 10.47 10.47 0 00-.372.181q-1.175.6-2.175 1.525a20.91 20.91 0 00-1.25 1.264 25.681 25.681 0 00-.75.861z"
				vectorEffect="non-scaling-stroke"
				strokeLinecap="round"
				fillRule="evenodd"
				fontSize="9pt"
				stroke="#000"
				strokeWidth=".25mm"
				fill="#000"
			/>
		</svg>
	)
}
