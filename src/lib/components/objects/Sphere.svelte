<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Vector3 } from 'three';

	const COLORS: Array<string> = ['#7f87b2', '#83b2d0', '#95dab6', '#f2e6b1', '#dc8580'];

	export let count: number = 60;
	export let rangeSize: [number, number] = [0, 3.5];
	export let rangeX: [number, number] = [-3, 3];
	export let rangeY: [number, number] = [-3, 3];
	export let rangeZ: [number, number] = [-3, 3];

	const getId = () => {
		return Math.random().toString(16).slice(2);
	};

	const randomNumber = (min: number, max: number): number => {
		return Math.random() * (max - min) + min;
	};

	const getRandomColor = (): string => {
		const rndNo = Math.floor(randomNumber(1, COLORS.length));
		return COLORS[rndNo];
	};

	const getRandomLifeTime = (): number => {
		return randomNumber(1, 5);
	};

	const getRandomPosition = (): Parameters<Vector3['set']> => {
		return new Vector3(
			randomNumber(rangeX[0], rangeX[1]),
			randomNumber(rangeY[0], rangeY[1]),
			randomNumber(rangeZ[0], rangeZ[1])
		).toArray();
	};

	const generateBodies = (c: number) => {
		return Array(c)
			.fill('x')
			.map(() => {
				const lifeTime = getRandomLifeTime();
				return {
					id: getId(),
					position: getRandomPosition(),
					color: getRandomColor(),
					lifeTime,
					baseTime: lifeTime,
					size: rangeSize[0]
				};
			});
	};

	$: bodies = generateBodies(count);

	useFrame((_, delta) => {
		const inteval = delta / 3;
		bodies = bodies
			.filter((i) => i.lifeTime > 0)
			.map((body) => ({
				...body,
				lifeTime: body.lifeTime - inteval,
				size:
					body.size > rangeSize[1] || body.lifeTime > body.baseTime / 2
						? body.size - inteval
						: body.size + inteval
			}));
		if (bodies.length < count) {
			bodies.push(...generateBodies(count - bodies.length));
		}
	});
</script>

{#each bodies as body (body.id)}
	<T.Group position={body.position}>
		<RigidBody type="dynamic">
			<Collider
				shape="ball"
				contactForceEventThreshold={30}
				restitution={0.4}
				args={[body.size]}
				mass={Math.random() * 10}
			/>
			<T.Mesh>
				<T.SphereGeometry args={[body.size]} />
				<T.MeshStandardMaterial bind:color={body.color} />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each}
