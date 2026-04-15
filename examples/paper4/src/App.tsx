import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, Float } from '@react-three/drei'
import { 
  ArrowRight, Users, Brain, Activity, 
  BarChart3, Database, Target, Zap,
  MousePointer2, Info, ExternalLink
} from 'lucide-react'
import {
  Author, ModelResult, BodyPart, GraphPoint, ArchitectureModule
} from './types'

// ==================== 3D Point Cloud Component ====================
function SparsePointCloud({ color = "#0ea5e9", pointCount = 500 }: { color?: string, pointCount?: number }) {
  const pointsRef = useRef<any>(null)
  const [points] = useState(() => {
    const positions = new Float32Array(pointCount * 3)
    for (let i = 0; i < pointCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return positions
  })

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        color={color}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </Points>
  )
}

// ==================== Sequential Animation Component ====================
function SequentialAnimation() {
  const [frame, setFrame] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 8)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const frames = [
    [{ x: 0, y: 0 }, { x: 1, y: 0.5 }, { x: 0.5, y: -0.5 }],
    [{ x: 0.1, y: 0.1 }, { x: 1.1, y: 0.6 }, { x: 0.6, y: -0.4 }],
    [{ x: 0.2, y: 0.2 }, { x: 1.2, y: 0.7 }, { x: 0.7, y: -0.3 }],
    [{ x: 0.3, y: 0.3 }, { x: 1.3, y: 0.8 }, { x: 0.8, y: -0.2 }],
    [{ x: 0.4, y: 0.4 }, { x: 1.4, y: 0.9 }, { x: 0.9, y: -0.1 }],
    [{ x: 0.5, y: 0.5 }, { x: 1.5, y: 1.0 }, { x: 1.0, y: 0 }],
    [{ x: 0.6, y: 0.6 }, { x: 1.6, y: 1.1 }, { x: 1.1, y: 0.1 }],
    [{ x: 0.7, y: 0.7 }, { x: 1.7, y: 1.2 }, { x: 1.2, y: 0.2 }],
  ]

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-center">
        <div className="w-32 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 p-2">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {frames[frame].map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x * 20 + 15}
                cy={point.y * 20 + 40}
                r={6}
                fill="#0ea5e9"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </svg>
        </div>
        <p className="text-xs text-gray-500 mt-1">Frame {frame + 1}</p>
      </div>
      <ArrowRight className="text-blue-400" size={32} />
      <div className="text-center">
        <div className="w-32 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-2">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {frames[frame].map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x * 20 + 15}
                cy={point.y * 20 + 40}
                r={6}
                fill="#a855f7"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </svg>
        </div>
        <p className="text-xs text-gray-500 mt-1">LSTM Output</p>
      </div>
    </div>
  )
}

// ==================== Architecture Diagram Component ====================
function ArchitectureDiagram() {
  const [activeModule, setActiveModule] = useState<number>(-1)

  const modules: ArchitectureModule[] = [
    {
      name: "Sequential Feature Module",
      description: "LSTM-based module that captures temporal dependencies in point cloud sequences",
      inputShape: ["20", "12", "8"],
      outputShape: ["20", "12", "3"],
      layers: [
        { type: "LSTM", shape: ["20", "12", "3"] },
      ]
    },
    {
      name: "Global Feature Module-I",
      description: "Extracts global features using T-NET and MLP layers for point-wise feature enhancement",
      inputShape: ["20", "12", "1088"],
      outputShape: ["20", "1024"],
      layers: [
        { type: "Transform", shape: ["8", "64"] },
        { type: "MLP", shape: ["512", "256", "128"] },
        { type: "MaxPool", shape: ["1024"] },
      ]
    },
    {
      name: "Global Feature Module-II",
      description: "Processes global features for semantic segmentation output with shared-weight MLP",
      inputShape: ["20", "12", "64"],
      outputShape: ["20", "12", "K"],
      layers: [
        { type: "Concat", shape: ["128"] },
        { type: "MLP", shape: ["128", "12", "K"] },
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((module, idx) => (
          <motion.div
            key={idx}
            className={`card cursor-pointer transition-all duration-300 ${
              activeModule === idx ? 'ring-2 ring-blue-500 shadow-xl' : ''
            }`}
            onClick={() => setActiveModule(idx)}
            onMouseEnter={() => setActiveModule(idx)}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-bold text-lg mb-2">{module.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{module.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Input:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">{`(${module.inputShape.join(", ")})`}</code>
            </div>
            <div className="flex items-center gap-2 text-xs mt-2">
              <span className="text-gray-500">Output:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">{`(${module.outputShape.join(", ")})`}</code>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-slate-50 to-blue-50">
        <h4 className="font-bold text-center mb-4">Architecture Flow</h4>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Input Data
            </div>
            <span className="text-xs text-gray-500">(20,12,3)</span>
          </div>
          <ArrowRight className="text-blue-400" />
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Sequential Module
            </div>
            <span className="text-xs text-gray-500">LSTM</span>
          </div>
          <ArrowRight className="text-blue-400" />
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Global Feature-I
            </div>
            <span className="text-xs text-gray-500">T-NET + MLP</span>
          </div>
          <ArrowRight className="text-blue-400" />
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Global Feature-II
            </div>
            <span className="text-xs text-gray-500">MLP Output</span>
          </div>
          <ArrowRight className="text-blue-400" />
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Segmentation
            </div>
            <span className="text-xs text-gray-500">6 Classes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== Body Part Visualization ====================
function BodyPartVisualization() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  const bodyParts: BodyPart[] = [
    { name: "Head", color: "#ef4444", points: [] },
    { name: "Prothorax", color: "#f97316", points: [] },
    { name: "Left Arm", color: "#eab308", points: [] },
    { name: "Right Arm", color: "#22c55e", points: [] },
    { name: "Left Leg", color: "#3b82f6", points: [] },
    { name: "Right Leg", color: "#8b5cf6", points: [] },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <h4 className="font-bold mb-4">Interactive Body Parts</h4>
        <div className="space-y-3">
          {bodyParts.map((part) => (
            <motion.div
              key={part.name}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                selectedPart === part.name 
                  ? 'bg-blue-50 ring-2 ring-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedPart(part.name)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: part.color }}
              />
              <span className="font-medium">{part.name}</span>
              {selectedPart === part.name && (
                <Target className="ml-auto text-blue-500" size={20} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card">
        <h4 className="font-bold mb-4">
          {selectedPart ? `${selectedPart} Details` : "Select a Body Part"}
        </h4>
        {selectedPart ? (
          <motion.div
            key={selectedPart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-gray-600">
              This body part is one of the 6 semantic classes in our mmWave sparse point cloud dataset.
              The model segments each point cloud into these categories for human pose estimation.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Class Accuracy</span>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedPart === "Head" && "91.18%"}
                  {selectedPart === "Prothorax" && "81.86%"}
                  {selectedPart === "Left Arm" && "81.09%"}
                  {selectedPart === "Right Arm" && "77.39%"}
                  {selectedPart === "Left Leg" && "80.00%"}
                  {selectedPart === "Right Leg" && "78.55%"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-500">Dataset Frames</span>
                <p className="text-2xl font-bold text-blue-600">11,000+</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <div className="text-center">
              <Info className="mx-auto mb-2" size={48} />
              <p>Click on a body part to see details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== Results Chart Component ====================
function ResultsChart() {
  const [metric, setMetric] = useState<'mAcc' | 'mIoU'>('mAcc')
  const [dataset, setDataset] = useState<'SPC' | 'S3DIS'>('SPC')

  const spcData: ModelResult[] = [
    { name: "DGCNN", mAcc: 81.67, mIoU: 65.58, head: 89.34, chest: 77.99, leftArm: 82.69, rightArm: 79.78, leftLeg: 80.72, rightLeg: 78.81 },
    { name: "PointNet", mAcc: 80.96, mIoU: 64.82, head: 91.32, chest: 80.80, leftArm: 79.78, rightArm: 80.72, leftLeg: 83.05, rightLeg: 71.67 },
    { name: "mmMesh", mAcc: 79.80, mIoU: 61.72, head: 90.74, chest: 79.18, leftArm: 78.45, rightArm: 78.75, leftLeg: 78.21, rightLeg: 74.99 },
    { name: "PointCNN", mAcc: 77.27, mIoU: 45.67, head: 93.77, chest: 47.81, leftArm: 86.18, rightArm: 80.36, leftLeg: 80.90, rightLeg: 72.91 },
    { name: "SetTransformer", mAcc: 62.67, mIoU: 54.15, head: 80.34, chest: 100.00, leftArm: 59.83, rightArm: 55.68, leftLeg: 44.43, rightLeg: 33.83 },
    { name: "Ours", mAcc: 82.31, mIoU: 67.45, head: 91.18, chest: 81.86, leftArm: 81.09, rightArm: 77.39, leftLeg: 80.00, rightLeg: 78.55 },
  ]

  const s3disData: ModelResult[] = [
    { name: "MinkowskiNet", mAcc: 71.7, mIoU: 65.4, head: 91.8, chest: 98.7, leftArm: 86.2, rightArm: 0.0, leftLeg: 34.1, rightLeg: 48.9 },
    { name: "PointNet", mAcc: 49.0, mIoU: 41.1, head: 88.8, chest: 97.3, leftArm: 69.8, rightArm: 0.1, leftLeg: 3.9, rightLeg: 46.3 },
    { name: "KPConv", mAcc: 72.8, mIoU: 67.1, head: 92.8, chest: 97.3, leftArm: 82.4, rightArm: 0.0, leftLeg: 23.9, rightLeg: 58.0 },
    { name: "PointCNN", mAcc: 63.9, mIoU: 57.3, head: 92.3, chest: 98.2, leftArm: 79.4, rightArm: 0.0, leftLeg: 17.6, rightLeg: 22.8 },
    { name: "PointTransformer", mAcc: 76.5, mIoU: 70.4, head: 94.0, chest: 98.5, leftArm: 86.3, rightArm: 0.0, leftLeg: 38.0, rightLeg: 63.4 },
    { name: "Ours", mAcc: 92.6, mIoU: 83.5, head: 75.6, chest: 79.9, leftArm: 98.4, rightArm: 98.1, leftLeg: 99.8, rightLeg: 93.8 },
  ]

  const data = dataset === 'SPC' ? spcData : s3disData

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-xl flex items-center gap-2">
          <BarChart3 className="text-blue-500" />
          {dataset === 'SPC' ? 'SPC Dataset Results' : 'S3DIS Dataset Results'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setDataset('SPC')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dataset === 'SPC' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            SPC
          </button>
          <button
            onClick={() => setDataset('S3DIS')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dataset === 'S3DIS' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            S3DIS
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMetric('mAcc')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            metric === 'mAcc' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Mean Accuracy (mAcc)
        </button>
        <button
          onClick={() => setMetric('mIoU')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            metric === 'mIoU' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Mean IoU (mIoU)
        </button>
      </div>

      <div className="space-y-3">
        {data.map((result, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <span className="w-32 font-medium">{result.name}</span>
            <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  result.name === 'Ours' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${(result[metric] / 100) * 100}%` }}
                transition={{ delay: idx * 0.05 + 0.3, duration: 0.5 }}
              />
            </div>
            <span className="w-20 text-right font-bold">
              {result[metric].toFixed(2)}%
            </span>
            {result.name === 'Ours' && (
              <Zap className="text-yellow-500 flex-shrink-0" size={20} />
            )}
          </motion.div>
        ))}
      </div>

      {dataset === 'SPC' && metric === 'mAcc' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Key Finding:</strong> Our model achieves <strong>82.31%</strong> mean accuracy on the custom SPC dataset, 
            outperforming all baseline algorithms including DGCNN (81.67%) and PointNet (80.96%).
          </p>
        </div>
      )}

      {dataset === 'S3DIS' && metric === 'mAcc' && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Key Finding:</strong> On the S3DIS dataset, our model achieves <strong>92.6%</strong> mean accuracy, 
            significantly outperforming PointTransformer (76.5%) and other state-of-the-art methods.
          </p>
        </div>
      )}
    </div>
  )
}

// ==================== Loss Function Comparison ====================
function LossFunctionComparison() {
  const epochs = [20, 40, 60, 80, 100, 120, 140, 160]
  const customLoss = [0.52, 0.68, 0.79, 0.85, 0.89, 0.91, 0.92, 0.93]
  const crossEntropy = [0.48, 0.62, 0.72, 0.78, 0.82, 0.85, 0.87, 0.88]
  const nllLoss = [0.45, 0.58, 0.67, 0.73, 0.77, 0.80, 0.82, 0.84]

  const maxVal = Math.max(...customLoss, ...crossEntropy, ...nllLoss) * 1.05

  return (
    <div className="card">
      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
        <Activity className="text-green-500" />
        Loss Function Comparison
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded" />
            <span>Custom Graph Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded" />
            <span>CrossEntropyLoss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded" />
            <span>NLLLoss</span>
          </div>
        </div>

        <div className="relative h-64 border-l border-b border-gray-300">
          {epochs.map((_, idx) => (
            <div key={idx} className="absolute bottom-0 left-0 right-0 flex items-end h-full">
              <div 
                className="flex-1 flex justify-center gap-1"
                style={{ paddingLeft: idx === 0 ? '20%' : '5%' }}
              >
                <motion.div
                  className="w-3 rounded-t bg-gradient-to-t from-green-600 to-green-400"
                  initial={{ height: 0 }}
                  animate={{ height: `${(customLoss[idx] / maxVal) * 256}px` }}
                  transition={{ delay: idx * 0.05 }}
                />
                <motion.div
                  className="w-3 rounded-t bg-gradient-to-t from-blue-500 to-blue-300"
                  initial={{ height: 0 }}
                  animate={{ height: `${(crossEntropy[idx] / maxVal) * 256}px` }}
                  transition={{ delay: idx * 0.05 + 0.02 }}
                />
                <motion.div
                  className="w-3 rounded-t bg-gradient-to-t from-purple-500 to-purple-300"
                  initial={{ height: 0 }}
                  animate={{ height: `${(nllLoss[idx] / maxVal) * 256}px` }}
                  transition={{ delay: idx * 0.05 + 0.04 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          {epochs.filter((_, i) => i % 2 === 0).map(epoch => (
            <span key={epoch}>{epoch} epochs</span>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Key Insight:</strong> The custom graph loss function converges faster, especially between epochs 40-60. 
            The accuracy using custom loss is consistently higher, demonstrating the effectiveness of incorporating 
            graph structure into the loss function for point cloud segmentation.
          </p>
        </div>
      </div>
    </div>
  )
}

// ==================== Graph Loss Visualization ====================
function GraphLossVisualization() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const points: GraphPoint[] = [
    { id: 1, x: 0, y: 0, z: 0, label: 0, targetLabel: 0 },
    { id: 2, x: 1, y: 0, z: 0, label: 0, targetLabel: 0 },
    { id: 3, x: 0.5, y: 0.866, z: 0, label: 1, targetLabel: 1 },
    { id: 4, x: -0.5, y: 0.866, z: 0, label: 1, targetLabel: 2 },
    { id: 5, x: 0.5, y: -0.866, z: 0, label: 2, targetLabel: 1 },
  ]

  const colors = ['#ef4444', '#3b82f6', '#22c55e']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <h4 className="font-bold mb-4">Interactive Graph</h4>
        <div className="relative w-full aspect-square bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg overflow-hidden">
          <svg viewBox="-2 -2 4 4" className="w-full h-full">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
            
            {/* Connections */}
            {points.map((p1, i) => 
              points.slice(i + 1).map((p2, j) => (
                <motion.line
                  key={`${p1.id}-${p2.id}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#cbd5e1"
                  strokeWidth={0.02}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: (i * points.length + j) * 0.02 }}
                />
              ))
            )}

            {/* Points */}
            {points.map((point) => (
              <g
                key={point.id}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={0.12}
                  fill={colors[point.label]}
                  stroke="#fff"
                  strokeWidth={0.04}
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: point.id * 0.1 }}
                />
                <text
                  x={point.x}
                  y={point.y}
                  dy="0.3"
                  textAnchor="middle"
                  fontSize="0.2"
                  fill="#334155"
                  className="font-bold"
                >
                  {point.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>Head (Label 0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span>Prothorax (Label 1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Leg (Label 2)</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="font-bold mb-4">Loss Function Formula</h4>
        <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
          <p className="font-mono text-sm">
            L = α|C<sub>1</sub> - C<sub>2</sub>| - 1
          </p>
          <p className="font-mono text-sm mt-2">
            where C = Σ δ<sub>ij</sub>W<sub>ij</sub>
          </p>
          <p className="font-mono text-sm mt-2">
            W<sub>ij</sub> = exp(-||p<sub>i</sub> - p<sub>j</sub>||² / 2)
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">C₁: Model Output Connectivity</p>
            <p className="text-xs text-blue-700 mt-1">
              Computed based on predicted segmentation labels
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-900">C₂: Target Connectivity</p>
            <p className="text-xs text-green-700 mt-1">
              Computed based on ground truth labels
            </p>
          </div>
        </div>

        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-gray-50 rounded-lg"
          >
            <p className="text-sm">
              <strong>Point {hoveredPoint}:</strong> 
              Predicted: Label {points.find(p => p.id === hoveredPoint)?.label}, 
              Target: Label {points.find(p => p.id === hoveredPoint)?.targetLabel}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ==================== Main App Component ====================
function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const authors: Author[] = [
    { name: "Pengfei Song", affiliation: "Southeast University", affiliationId: 1 },
    { name: "Luoyu MEI", affiliation: "City University of Hong Kong", affiliationId: 2 },
    { name: "Han Cheng", affiliation: "UC Berkeley", affiliationId: 3 },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              mmWave Segmentation
            </h1>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('problem')} className="nav-link">Problem</button>
              <button onClick={() => scrollToSection('architecture')} className="nav-link">Architecture</button>
              <button onClick={() => scrollToSection('results')} className="nav-link">Results</button>
              <button onClick={() => scrollToSection('dataset')} className="nav-link">Dataset</button>
              <a 
                href="https://arxiv.org/abs/2304.14132"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                View Paper <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <SparsePointCloud color="#0ea5e9" pointCount={300} />
            </Float>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Human Semantic Segmentation using
              <span className="block gradient-text mt-2">
                mmWave Radar Sparse Point Clouds
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {authors.map((author, idx) => (
                <motion.div
                  key={author.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Users size={16} className="text-blue-400" />
                  <span>{author.name}</span>
                  <span className="text-blue-400 text-sm">•</span>
                  <span className="text-blue-200 text-sm">{author.affiliation}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A novel framework for semantic segmentation on sparse sequential point clouds 
              of millimeter-wave radar, capturing temporal-topological coupling features.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('problem')}
                className="btn-primary flex items-center gap-2"
              >
                Explore the Research <ArrowRight />
              </button>
              <a 
                href="https://arxiv.org/abs/2304.14132"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                arXiv:2304.14132 <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="text-blue-400 rotate-90 mx-auto" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title text-blue-600">The Challenge</h2>
            <p className="section-subtitle">
              Millimeter-wave radars offer privacy-preserving sensing with strong anti-interference ability,
              but their sparse point clouds pose unique challenges for semantic segmentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Sparsity</h3>
              <p className="text-gray-600 text-sm">
                mmWave radar data is relatively sparse compared to LiDAR, losing spatial characteristics.
              </p>
            </motion.div>

            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Temporal-Topological Coupling</h3>
              <p className="text-gray-600 text-sm">
                Sequential frames contain temporal dependencies that traditional methods fail to capture.
              </p>
            </motion.div>

            <motion.div
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">No Topology</h3>
              <p className="text-gray-600 text-sm">
                Point clouds lose topological features, making it hard for models to achieve good segmentation.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="card bg-gradient-to-br from-slate-50 to-blue-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MousePointer2 className="text-blue-500" />
              Temporal-Topological Coupling Feature
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-gray-600 mb-4">
                  Unlike traditional point cloud processing, mmWave radar data includes coherent actions 
                  like walking or arm-swinging. The data is temporally-topologically related:
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                  f<sup>(π)</sup>(x<sup>(k)</sup><sub>1</sub>, ..., x<sup>(k)</sup><sub>m</sub>) ≈ 
                  f<sup>(π)</sup>(x<sup>(k+1)</sup><sub>1</sub>, ..., x<sup>(k+1)</sup><sub>m</sub>)
                </div>
              </div>
              <div className="flex justify-center">
                <SequentialAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title text-blue-600">Network Architecture</h2>
            <p className="section-subtitle">
              Three key modules work together to capture both sequential and global features for 
              effective semantic segmentation on sparse point clouds.
            </p>
          </div>

          <ArchitectureDiagram />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="text-purple-600" size={24} />
                </div>
                <h3 className="font-bold">Sequential Module</h3>
              </div>
              <p className="text-gray-600 text-sm">
                LSTM-based architecture captures long-term temporal dependencies in point cloud sequences,
                solving the sequential-related problem with its memory mechanism.
              </p>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold">Global Feature-I</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Extracts global features using T-NET and MLP layers, computing a global signature for
                each point and concatenating it back to per-point features.
              </p>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="text-green-600" size={24} />
                </div>
                <h3 className="font-bold">Global Feature-II</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Processes global features for semantic segmentation output using shared-weight MLP,
                producing K-class segmentation labels for each point.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title text-blue-600">Experimental Results</h2>
            <p className="section-subtitle">
              Our model outperforms state-of-the-art algorithms on both the custom SPC dataset and 
              the well-known S3DIS dataset, demonstrating robustness and effectiveness.
            </p>
          </div>

          <ResultsChart />

          <div className="mt-12">
            <LossFunctionComparison />
          </div>

          <div className="mt-12">
            <GraphLossVisualization />
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section id="dataset" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">SPC Dataset</h2>
            <p className="section-subtitle text-gray-300">
              A custom mmWave sparse point cloud dataset collected using iwr6843 commercial radar,
              with ground truth from Kinect motion-capturing device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="card bg-white/10 backdrop-blur-sm border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-cyan-400" size={32} />
                <h3 className="font-bold text-xl">Dataset Statistics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-300">Total Frames</span>
                  <span className="font-bold text-cyan-400">11,000+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-300">Training Set</span>
                  <span className="font-bold">70%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-300">Testing Set</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-300">Validation Set</span>
                  <span className="font-bold">10%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Radar Model</span>
                  <span className="font-bold">iwr6843</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card bg-white/10 backdrop-blur-sm border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-pink-400" size={32} />
                <h3 className="font-bold text-xl">Data Collection Pipeline</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-cyan-400">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">mmWave Radar</p>
                    <p className="text-sm text-gray-400">Emits FMCW signals and captures reflected signals</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-500 mx-10 -my-2" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-pink-400">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Kinect Motion Capture</p>
                    <p className="text-sm text-gray-400">Obtains high precision dynamic pose information</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-500 mx-10 -my-2" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-green-400">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Ground Truth Generation</p>
                    <p className="text-sm text-gray-400">Creates annotated point clouds for training</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <BodyPartVisualization />
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title text-blue-600">Authors</h2>
            <p className="section-subtitle">
              Researchers from leading institutions working on mmWave radar and computer vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authors.map((author, idx) => (
              <motion.div
                key={author.name}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{author.name}</h3>
                    <p className="text-gray-600 text-sm">{author.affiliation}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="mailto:spf@seu.edu.cn"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Email
                  </a>
                  <span className="text-gray-300">•</span>
                  <a
                    href="https://arxiv.org/search/?query=pengfei+song&searchtype=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Publications <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="text-center mb-6">
              <h2 className="section-title text-blue-600">Conclusion</h2>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                This paper presents an efficient framework for semantic segmentation on sparse sequential 
                point clouds of millimeter-wave radar. The model successfully captures temporal-topological 
                coupling features and achieves state-of-the-art results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-3xl font-bold text-blue-600">82.31%</p>
                  <p className="text-sm text-gray-600">Mean Accuracy on SPC</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-3xl font-bold text-green-600">92.6%</p>
                  <p className="text-sm text-gray-600">Mean Accuracy on S3DIS</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-3xl font-bold text-purple-600">6</p>
                  <p className="text-sm text-gray-600">Semantic Classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About This Visualization</h3>
              <p className="text-gray-400 text-sm">
                An interactive webapp visualizing the research paper "Human Semantic Segmentation 
                using mmWave Radar Sparse Point Clouds" (arXiv:2304.14132).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Citation</h3>
              <p className="text-gray-400 text-sm font-mono">
                Song, P., Mei, L., & Cheng, H. (2023). Human Semantic Segmentation using 
                Millimeter-Wave Radar Sparse Point Clouds. arXiv:2304.14132.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <div className="space-y-2">
                <a 
                  href="https://arxiv.org/abs/2304.14132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  arXiv Paper
                </a>
                <a 
                  href="https://arxiv.org/pdf/2304.14132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  PDF Download
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              Built with React, Three.js, and Tailwind CSS • 
              Based on research from Southeast University, City University of Hong Kong, and UC Berkeley
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
