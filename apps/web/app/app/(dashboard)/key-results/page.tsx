import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@local/ui"
import Calculator from "./calculator"

export default function KeyResultsPage() {
	return (
		<div className="min-h-full">
			<Card>
				<CardHeader>
					<CardTitle>Planejador de metas</CardTitle>
					<CardDescription>
						Crie metas, veja o progresso, bata metas!
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Calculator />
				</CardContent>

				<CardFooter>

				</CardFooter>
			</Card>
		</div>
	)
}
