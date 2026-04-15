Human Semantic Segmentation using
Millimeter-Wave Radar Sparse Point Clouds
Pengfei Song∗§†, Luoyu MEI∗‡†, Han Cheng∗
∗ Southeast University, ‡ City University of Hong Kong, § UC Berkeley
Email: [spf, lymei-, 213191775]@seu.edu.cn
arXiv:2304.14132v2  [cs.CV]  28 Apr 2023
Abstract—This paper presents a framework for semantic
segmentation on sparse sequential point clouds of millimeter
wave radar. Compared with cameras and lidars, millimeter
wave radars have the advantage of not revealing privacy, having
a strong anti-interference ability, and having long detection
distance. The sparsity and capturing temporal-topological fea
tures of mmWave data is still a problem. However, the issue
of capturing the temporal-topological coupling features under
the human semantic segmentation task prevents previous ad
vanced segmentation methods (e.g PointNet, PointCNN, Point
Transformer) from being well utilized in practical scenarios.
To address the challenge caused by the sparsity and temporal
topological feature of the data, we (i) introduce graph structure
and topological features to the point cloud, (ii) propose a
semantic segmentation framework including a global feature
extracting module and a sequential feature-extracting module.
In addition, we design an efficient and more fitting loss function
for a better training process and segmentation results based
on graph clustering. Experimentally, we deploy representative
semantic segmentation algorithms (Transformer, GCNN, etc.) on
a custom dataset. Experimental results indicate that our model
achieves mean accuracy on the custom dataset by 82.31% and
outperforms the state-of-the-art algorithms. Moreover, to validate
the model’s robustness, we deploy our model on the well-known
S3DIS dataset. On the S3DIS dataset, our model achieves mean
accuracy by 92.6%, outperforming baseline algorithms.
Index Terms—semantic segmentation, mmWave, point cloud,
sparse data
I. INTRODUCTION
Millimeter-wave radar has broad application prospects in the
f
ields of unmanned driving, security monitoring, and robotics.
Commercial millimeter-wave radars have been deployed. The
semantic information of millimeter wave radar point cloud
imaging has become a new requirement: in application sce
narios such as surveillance and human-computer interaction,
compared with cameras and lidars, millimeter-wave radars
have the advantage of not revealing privacy, having a strong
anti-interference ability, and having a long detection distance.
The vast majority of advanced segmentation models (e.g
PointNet [1], PointCNN [11]) simply assume that the temporal
feature of data is independent of the topological feature. This
fails to capture the temporal-topological coupling features
under the human semantic segmentation task. We propose
a segmentation system that is able to capture the temporal
topological coupling feature. In recent years, significant effort
has gone towards various ways of human semantic segmen
tation tasks. However, since the data structure of the point
†
: Corresponding author
cloud loses the topological feature, such methods (PointNet
[1], Point transformer [14]) are hard to get trained to fetch
satisfying segmentation results during the training process.
Thus we construct a graph by weight adjacency matrix to help
reconstruct the topological feature when training. In addition,
to our best knowledge, there does not exist satisfying public
datasets and annotations.
Our segmentation system takes advantage of the point cloud
processing ability of the neural network. It is able to analyze
the characteristics of point cloud information from different
angles and arrangements, and perform human semantic seg
mentation on millimeter wave radar point cloud imaging. To
summarize, our work makes the following contributions:
• We propose a framework for semantic segmentation on
sparse sequential point clouds of millimeter-wave radar.
We are the first to use the opportunity to capture the
intrinsic temporal-topological coupling feature to help
address the human semantic segmentation problem.
• Wedesign a segmentation system to address the challenge
of the sparsity and temporal-topological dependence of
mmWave point cloud data. We construct a graph by
weight adjacency matrix to help reconstruct the topolog
ical feature when training. In addition, we collect a new
mmWave sparse point cloud dataset (SPC).
• We evaluate our system’s performance both on SPC
(custom dataset) and the well-known S3DIS dataset. Our
model achieves mean accuracy on custom dataset by
82.31% and outperforms the state-of-the-art algorithms.
On S3DIS dataset, our model achieves mean accuracy
by 92.6%, still outperforms the baseline algorithms.
Thus prove that the system functions stably and captures
temporal-topological coupling features successfully.
II. BACKGROUND AND MOTIVATION
In this section, we first introduce the basic concepts of
human semantic segmentation and then explain the design
motivation. Finally, we introduce the net architecture of our
work.
A. Human Semantic Segmentation
Since the input data are points, we need to process input data
to achieve the segmentation labels(i.e., to divide point clouds
into different equivalent classes), consider two topological
space X and X/∼ (Borrowed from the notation of topology
[17], X is a set of points xi ∈ Rn with discrete topology,
Point Cloud Geometry
1
4
2
3
5
# x y z
4
=
5
3
1
2
Point Cloud Representation
# x y z
1 x1 y1 z1
2 x2 y2 z2
3 x3 y3 z3
4 x4 y4 z4
5 x5 y5 z5
≠
1 x’1 y’1 z’1
2 x’2 y’2 z’2
3 x’3 y’3 z’3
4 x’4 y’4 z’4
5 x’5 y’5 z’5
Fig. 1. Data Structure of Point Cloud. On the left-hand side of Fig.1,
we demonstrate the invariance of the order of input point clouds. Detailed
description is in section II, part B. On the right-hand side of Fig.1, we illustrate
the temporal-topological coupling feature of mmWave human body data. This
is a side view of point cloud collected by millimeter-wave radar for the same
human body moving forward process. The different colors of the point clouds
indicate that the human point clouds belong to different frames. Detailed
analysis is in section II, part B.
and X/∼ is the set of equivalent classes with the quotient
topology. ∼ is the equivalence relation.). And f∗ : X → X/∼
is the ideal function we need to approximate with the help
of our model. Thus, it is important to determine the form of
equivalent relation ∼, i.e., the condition that two points have
the same semantic label.
Finally, detecting and analyzing sparse point clouds can be
mathematically understood as a function defined on the point
cloud space X:
f∗ (x1,··· ,xn) : X → X/∼
where x1,··· ,xn belong to the point cloud space X. In
essence, the task is to find a more suitable neural network
to approximate the objective function more accurately f∗, to
achieve a better segmentation effect.
B. Properties of Sparse Point Sets in X
• The sparsity of point clouds: Due to the short wavelength
and other reasons, the data collected by millimeter-wave
radar is relatively sparse compared with the data collected
by traditional lidar.
• Invariance of the order of input point clouds: As shown
on the left-hand side of Fig.1, unlike other traditional
methods of image processing and so on, the result of
f∗ (x1,··· ,xn) is invariant to certain transformations
(e.g., permutation) of input data. Given a set of points,
what point cloud geometry means that the serial number
doesn’t matter to the geometry of points. Whatever the
serial number of a point is, the point is still itself
geometrically. But if we change the serial number of each
point, when we represent the point clouds by matrix, the
point cloud representation will change.
• Temporal-topological coupling feature: As shown on the
right-hand side of Fig.1, a bunch of frames of the human
body moving forward process data are included. Different
frames are distinguished by different colors. Due to the
discontinuity of the data collecting process, one part of
the human body is not continuously tracked. Take feet for
example, it is not fully captured in all different frames
of the same human. Considering that the point clouds
contain the information of coherent actions like walking
or arm-swinging, the data is temporally-topologically
related:
f π x(k)
1 ,...,x(k)
m ≈f π x(k+1)
where x(k)
1
, . . . , x(k+1)
m
m stands for a point, m means the m-th point
in the point cloud of one frame, and k means the k-th
frame in the time series. The feature-extraction projection
π maps point clouds from Euclidean space to time series
feature spaces.
C. Net Architecture
There are three key parts in our network: the sequential
feature module, the global feature module-I for points’ global
feature extraction, and the global feature module-II for seman
tic segmentation results’ process as well as output.
• The architecture of our network is demonstrated in Fig.2,
which contains targeted effective solutions for sequential
feature extraction. A more detailed introduction of our
network(parameters and so on) is included in the caption
of Fig.2.
• Considering that point cloud sequences have sequence
dependencies, the semantic information of different point
clouds interferes with each other. To solve the problem,
we proposed targeted solutions in the sequential feature
module in Fig.2.
III. MAIN DESIGN
In this section, we first describe capturing temporal
topological features of mmWave data, then explain the global
feature extracting module of our model. Then, we explain the
construction of custom loss function by graph theory to help
reconstruct the topological feature when training. Finally, we
introduce the multitask method used when training.
A. Sequential Feature Extracting Module
Inspired by [25], we illustrate our sequential feature
extracting mechanism in Fig.3 and describe the formulation
as below:
ft = σ(Wf ·[ht−1,xt] +bf)
it = σ(Wi ·[ht−1,xt] + bi)
˜
Ct =tanh(Wc ·[ht−1,xt] +bc)
Ct =ft ∗Ct−1 +it ∗ ˜Ct
Ot =σ(Wo·[ht−1,xt] +bo)
ht = Ot ∗tanh(Ct)
(1)
(2)
(3)
(4)
(5)
(6)
The point cloud data is sparse as well as sequential. Since
the mechanism has Eq.(4), which is able to hold long-term
memories, thus solving the sequential-related problem.
Sequential Feature Module
Global Feature Module-II
Input
Data2
(20,12,3)
LSTM
(20,12,3)
Input
Data1
(20,12,8)
Input
transform
(20,12,1088)
MLP(8,64)
MLP
(512,256,128)
Shared
Weight
MLP
(128,12,K)
(20,12,128)
Shared
Weight
(20,12,
8)
shared
(20,12,64)
Feature
transform
(20,12,64)
MLP
(64,128,1024)
Output
Data
(20,12,
K)
(20,12,1024)
···
T-Net
T-Net
shared
···
MaxPool
Global Feature 
Module-I
Matrix
Mutiply
8×8
transform
Matrix
Mutiply
64×64
transform
(20,1024)
Fig. 2. Net Architecture of Our Model. Our model contains three parts: Sequential feature module, global feature module-I, and global feature module II. The
number K in Global Feature Module-II is the number of kinds of segmentation labels. Here MLP means multi-layer perceptron. T-NET stands for PointNet [1].
The section Sequential Feature Extracting Module further discussed the sequential feature module and analyzed the sequential feature extracting mechanism.
The section Global Feature Extracting Module further discussed the global feature module-I.
TABLE I
MATH NOTITIONS
Notition
σ
W· 1
b· 2
Ct
ft
Ot
ht
Description
Activation Function
Trainable Weights
Bias
Long-Term Memory
Forgetable Weight
Output with Sequential Feature
Final Output
1 W· is generalized description of Wf, Wi, Wc.
2 b· is genralized description of bf, bi, bc.
Ct-1
ht-1
ft
it
Ot
xt
Fig. 3. Sequential Feature Extracting Mechanism. More detailed math
notitions are included in Table I
B. Global Feature Extracting Module
In Global Feature Module I and Module II, we compute a
global signature F ∈ RK (K is the global feature dimension)
for points according to each frame of the human body data
sequence. Then we feed the global signature F back to per
point features by concatenating the global signature F with
each of the point features. Then we repeat the action to make
our model extract global features deeply enough. Given a point
with its global signature, since each point belongs to its human
body frame, we could make better semantic segmentation
results if we have more wise global features for this particular
point. Note that we should master the depth of the global
extracting module since overfitting will occur more often when
the neural network goes deeper.
C. Design of Custom Loss Function
ht
Ct
ht
The segmentation task requires us to find the partition of
the graph such that the weight between different groups of
vertices on the graph is quite low as well as similar to the
target segmentation results. Since the points with the same
label should have rather a strong relationship with each other,
the weights within the same kind of points should have high
weights. As illustrated in Fig.4, suppose the segmentation
output (shown in the middle graph of Fig.4) is that points 1, 2,
and 5 are of the same kind. Point 3 and point 4 are of another 2
different kinds. Besides, suppose the target segmentation result
(shown on the right of Fig.4) is that points 1 and 2 are of the
same kind. Points 3 and 5 are of the same kind. Point 4 is
of the other different kind. Thus a graph is partitioned into
different groups, and each group of points has the same label.
How to describe the loss? The original idea is to weigh the
similarity of the output and target result. Thus we define the
connectivity of a partitioned graph:
n
C =
i=1
n
j=i
δijWij
Here n is the number of points in the point cloud,
δij = 0 whenpointi and j are of the same kind
(7)
1 whenpoint i and j are of different kind
and δ function is determined by the segmentation label, which
means that given two same graphs with different labels like the
middle and the right graph in Fig.4, though sharing the same
weight matrix, their coordinating δ function will be different.
And W stands for the weight adjacency matrix computed
according to the Gauss Similarity Function:
w12
w23
w24
w15
w14
w13
w45
w12
w25
w34
w24
w15
w35
w14
w13
w45
w23
w25
w34
w12
w24
w15
w35
w14
w13
w45
Fig. 4. Segmentation Visualization on Graphs. This is a complete graph of
f
ive points. The item sitting on the left is the weight matrix visualization on
the graph. Wij means the weight between points i and j. The middle item
is the schematic diagram of our model’s output. Points with the same label
are painted in the same color and connected with solid black lines. Points
with different labels are connected with a dotted line. Different colors mark
the different labels of points. The right item is the schematic diagram of the
target segmentation result.
Wij = exp−pi−pj 22, where pi,pj ∈ Rdx, dx is the feature
dimensionality of each point, pi,pj is the point i and point j
in the graph, the norm of pi − pj is 2-norm.
Finally, the custom self-designed graph loss function is shown
below, which introduces topological feature into the point
cloud segmentation task:
C1 =
n
i=1
n
C2 =
i=1
n
j=i
n
j=i
δ1
ijWij
δ2
ijWij
L =a|C1−C2| −1
Here C1 and C2 are computed according to the connectivity
formula above, but their δ function is different. C1 stands for
the connectivity of our model’s segmentation result, as illus
trated in the middle of Fig.4. C2 stands for the connectivity
of the target segmentation result, as illustrated in the right of
Fig.4. Because the two graphs’ segmentation label is different,
so their δ function is different. Empirically, we set a = 1.1 in
experiments.
D. Training with Multitask
The training data is sparse and sequence-dependent. We
labeled the point clouds as head, prothorax, left arm, right
arm, left leg, and right leg. Some semantic labels have similar
semantic information, like left leg and right leg, which means
that classifying those semantic-similar points requires more
effort. To improve the effectiveness of the six classifications,
we also labeled the point clouds as head+prothorax, arm, and
leg to do Multi-task learning.
IV. EXPERIMENTS
A. Dataset and Data Collection
1) mmWave Sparse Point Cloud Dataset (SPC): To our best
knowledge, there doesn’t exist satisfactory dataset opening to
the public. We collect the SPC data using mmWave radar.
In the data-collecting process, we use the iwr6843 commer
cial mmWave radar, which emits FMCW signals from its
transmitting antennas and captures the reflected signals using
its receiving antennas. Then the radar hardware mixes the
received signals with the transmitted signal to obtain the IF
(Intermediate Frequency) signals, which are the outputs of the
Motion Capture System
w23
w25
w34
Data Collection
w35
Save
Original 
Data
Millimeter Wave Radar
Preprocess
Canonical
Data
Fig. 5. Original Data Collection and Preprocessing.
(8)
(9)
(10)
mmWave radar. The data collecting process is shown in Fig.5.
In addition to the collection of mmWave data, we also use the
Kinect as the motion-capturing device to obtain high precision
dynamic pose information of the subject, which is utilized to
generate the ground truth point cloud that is used to train the
proposed deep learning model in our system. There are human
body data categorized into 6 kinds: Head, chest, left arm, right
arm, left leg, and right leg. The dataset has over 11,000 frames
of human body data, which is split into 70 percent for training,
20 percent for testing and 10 percent for validation.
2) S3DIS Dataset: To validate the robustness of our model,
we deploy our model on the well-known S3DIS dataset.
B. Results on SPC Dataset
We evaluate our model together with other outstanding
models on the mmWave Sparse Point Cloud Dataset. There
are human body data categorized into 6 kinds: Head, chest,
left arm, right arm, left leg, and right leg. While previous
methods are called masterpieces of various branches in the
f
ield of point cloud segmentation, to our best knowledge, we
are the first to train with a newly designed graph loss function.
The segmentation results are shown in Table II. And the
experiments in Table II indicate that our model outperforms
the baseline algorithms. To address the problem caused by the
sparsity of input data, the original idea is to improve the ability
of feature extraction. We lift the feature dimension for our
model to grab features globally. Under these circumstances,
it is worthy stressing that we should focus less on the local
signature of each point and pay more attention to feature
extracting as well as fixing local feature mistakes. That is
determined by the sparsity of input data, which means that
compared to extracting global features, over-fitting occurs
more often when extracting local features, which is shown in
the experiment(in Table II). The Transformer model and other
models using the self-attention mechanism don’t perform well.
We analyze the reason is that the attention mechanism focuses
on the local feature of each point, thus leading to over-fitting
mistakes and reducing the segmentation results.
C. Results on S3DIS
Besides, to validate the robustness of our model, we deploy
it on the Stanford 3D semantic parsing dataset [18]. The
segmentation results are demonstrated in Table III. Our model
is tested on the S3DIS dataset and achieves an excellent result,
TABLE II
SEMANTIC SEGMENTATION RESULTS ON MMWAVE SPARSE POINT CLOUD DATASET
Network mAcc mIoU Head Chest Left Arm Right Arm Left Leg Right Leg
DGCNN 81.67 65.58 89.34 77.99 82.69 79.78 80.72 78.81
PointNet 80.96 64.82 91.32 80.80 79.78 80.72 83.05 71.67
mmMesh 79.80 61.72 90.74 79.18 78.45 78.75 78.21 74.99
PointCNN 77.27 45.67 93.77 47.81 86.18 80.36 80.90 72.91
SetTransformer 62.67 54.15 80.34 100.00 59.83 55.68 44.43 33.86
Ours 82.31 67.45 91.18 81.86 81.09 77.39 80.00 78.55
Metric is mIoU and mAcc(mean accuracy) on points. We compare with outstanding traditional methods.
Our method achieved state-of-the-art in both mIoU and mAcc. Detailed analysis is in part IV, section B.
TABLE III
SEMANTIC SEGMENTATION RESULTS ON S3DIS
Network mAcc mIoU Ceiling Floor Wall Beam Column Window Door Table Chair Sofa Bookcase Board Clutter
MinkowskiNet 71.7 65.4 91.8 98.7 86.2 0.0 34.1 48.9 62.4 81.6 89.8 47.2 74.9 74.4 58.6
PointNet 49.0 41.1 88.8 97.3 69.8 0.1 3.9 46.3 10.8 59.0 52.6 5.9 40.3 26.4 33.2
KPConv 72.8 67.1 92.8 97.3 82.4 0.0 23.9 58.0 69.0 81.5 91.0 75.4 75.3 66.7 58.9
PointCNN 63.9 57.3 92.3 98.2 79.4 0.0 17.6 22.8 62.1 74.4 80.6 31.7 66.7 62.1 56.7
PointTransformer 76.5 70.4 94.0 98.5 86.3 0.0 38.0 63.4 74.3 89.1 82.4 74.3 80.2 76.0 59.3
Ours 92.6 83.5 75.6 79.9 98.4 98.1 99.8 93.8 98.0 98.1 99.8 96.0 99.5 89.8 74.2
Metric is mIoU and mAcc (mean accuracy). Our method achieved the state-of-the-art in mIoU and mAcc.
Training with Different Loss Function(Same Learning Rate=0.01)
1
0.9
0.8
Accuracy
0.7
0.6
0.5
Acc using Custom Loss Function
Acc using NLL Loss Function
Acc using CrossEntropyLoss
0.4
0
20
40
60
80
100
Training Epoch
120
Fig. 6. Custom Train Loss Function.
140
160
which shows that our model is robust as well as efficient.
Compared to previous studies, our method outperforms them
by a large margin on the beam categories reported.
D. Experiments of Custom Loss Function
To show that our newly designed graph loss function is
more fitting with the point cloud segmentation result, we
draw the variation of training accuracy using different loss
functions w.r.t training epoch in Fig.6. From the curves we
say that the accuracy using custom loss function converges
faster especially when training epoch increasing from 40 to
60. It is easier for our model to improve performance after
introducing graph structure in the loss function.
V. RELATED WORK
A. Pioneer Work
Authors at Stanford University propose the PointNets series
(including PointNet [1] to understand the three-dimensional
spatial characteristics of objects, realizes object classification
and scene segmentation, which is a pioneering work for
directly processing point sets. PointNet [1] was first proposed
in 2016. Its basic architecture consists of multiple layers of
perception. However, the design of its network structure makes
it difficult to capture the local features of the point cloud as
well as to process the point cloud sequence data related to
time series.
B. Graph-based Network
Graph neural network-based studies [2], [3], [22]–[24] have
developed rapidly in recent years. In point cloud processing,
Kipf et al. [2] proposed a graph convolutional network (GCN)
for semi-supervised learning on graph structure data, which
builds a local graph for each point group in the network
layer and aggregates point data according to the relationship
between points. Kim et al. [3] proposed a rotation-invariant
recognition model RI-GCN for 3D point cloud data, based on
Graph convolutional neural networks (GCNs).
C. Continuous Convolution Network
Lyu et al. [5] project a 3d point cloud into 2d image
space, enabling traditional 2D convolutional neural networks
to be used for segmentation. However, the results of this
method are not satisfactory on some datasets. PointCNN [11]
arranges point clouds into normative order by introducing
X-transformation, and then performs the element-by-element
product sum operation of typical convolution operators on X
transformed features. Although the effect of X-transformation
is not as expected, it still improves the accuracy of prediction.
D. Attention-based Network
Attention network [13] uses the Attention mechanism for
machine translation tasks, and achieved good results. SetTrans
former [14] and PointTransformer [15] are typical represen
tations of the attention-based network. PointTransformer [15]
designed a self-attention layer for the point cloud and applied
it to the semantic segmentation of the point cloud, achieving
excellent results. SetTransformer [14] designed its encoder and
decoder based on the attention mechanism.
E. Sparse Segmentation Network
Compared with the lidar point cloud, the millimeter-wave
radar point cloud is very sparse, which makes the point
cloud lose some spatial characteristics. Li et al. [6] proposed
a fast segmentation algorithm for the sparse point cloud.
Schumann et al. [7] accumulated multiple radar frames to
obtain richer point clouds, avoiding the sparse characteristics
of millimeter-wave radar point clouds, and then applied the
Frustum PointNet with a small adaptation to segmentation.
F. Other Related Work
Adhikari et al. [9] proposed a full-body contour imaging and
three-dimensional pose estimation system named MilliPose.
mesh [16] used the pointnet-based template to preliminarily
process the human point cloud collected by millimeter-wave
radar, and then input the preliminarily processed data into
the SMPL model to obtain a mesh human model for attitude
estimation as well as semantic segmentation.
VI. CONCLUSION
In this paper, we propose an efficient and outstanding
framework for semantic segmentation on sparse sequential
point clouds. Our model is capable of achieving satisfying
segmentation results under the situation of sparse, sequential,
and non-structured data. Moreover, since the point cloud data
lack topological features, we also analyzed and optimized the
data structure of the point cloud. To our best knowledge, there
are no satisfying mmWave datasets with sparse feature open
to the public. To cope with that, we collected SPC (custom
dataset) scientifically and cautiously. We experimentally show
that our model outperforms many existing segmentation mod
els both on the famous S3DIS dataset and the custom dataset.
We wish this work to pave the way for future research on
human semantic segmentation.
VII. ACKNOWLEDGEMENT
This work was supported in part by 2030 major projects
of scientific and technological innovation under Grant No.
2021ZD0114200, National Natural Science Foundation of
China under Grant No. 62272098.
REFERENCES
[1] Qi, C., Su, H., Mo, K., & Guibas, L.J. (2017). PointNet: Deep Learning
on Point Sets for 3D Classification and Segmentation. IEEE Conference
on Computer Vision and Pattern Recognition (CVPR), 77-85.
[2] Kipf, T. N., & Welling, M. (2016). Semi-supervised classification with
graph convolutional networks. arXiv preprint arXiv:1609.02907.
[3] Kim, S., Park, J., & Han, B. (2020). Rotation-invariant local-to-global
representation learning for 3d point cloud. Advances in Neural Informa
tion Processing Systems, 33, 8174-8185.
[4] Xu, Q., Sun, X., Wu, C. Y., Wang, P., & Neumann, U. (2020). Grid
gcn for fast and scalable point cloud learning. In Proceedings of the
IEEE/CVF Conference on Computer Vision and Pattern Recognition
(pp. 5661-5670).
[5] Y. Lyu, X. Huang and Z. Zhang, ”Learning to Segment 3D Point Clouds
in 2D Image Space,” 2020 IEEE/CVF Conference on Computer Vision
and Pattern Recognition (CVPR), 2020, pp. 12252-12261.
[6] Li, M., & Yin, D. (2017, May). A fast segmentation method of sparse
point clouds. In 2017 29th Chinese Control And Decision Conference
(CCDC) (pp. 3561-3565). IEEE
