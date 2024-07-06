/*
 Navicat Premium Data Transfer

 Source Server         : G15
 Source Server Type    : MySQL
 Source Server Version : 80400 (8.4.0)
 Source Host           : localhost:3306
 Source Schema         : gpms1

 Target Server Type    : MySQL
 Target Server Version : 80400 (8.4.0)
 File Encoding         : 65001

 Date: 07/07/2024 01:10:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for common_file
-- ----------------------------
DROP TABLE IF EXISTS `common_file`;
CREATE TABLE `common_file`  (
  `common_file_id` int NOT NULL AUTO_INCREMENT COMMENT '公共文件id',
  `common_file_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '公共文件名',
  `common_file_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '公共文件内容',
  PRIMARY KEY (`common_file_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of common_file
-- ----------------------------
INSERT INTO `common_file` VALUES (1, '开题报告模板', 'uploads/common/开题报告模板.docx');
INSERT INTO `common_file` VALUES (2, '毕业论文模板', 'uploads/common/毕业论文模板.docx');
INSERT INTO `common_file` VALUES (3, '校外毕设申请模板', 'uploads/common/校外毕设申请模板.docx');
INSERT INTO `common_file` VALUES (4, '答辩申请模板', 'uploads/common/defApplyTemplate.docx');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `stu_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_start_time` datetime NULL DEFAULT NULL,
  `translation_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_translation_time` datetime NULL DEFAULT NULL,
  `outschool_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `upload_outschool_time` datetime NULL DEFAULT NULL,
  `midReport_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_midReport_time` datetime NULL DEFAULT NULL,
  `midWork_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_midWork_time` datetime NULL DEFAULT NULL,
  `defenseApply_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_defenseApply_time` datetime NULL DEFAULT NULL,
  `final_file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_fianl_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`stu_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `stu` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('202411111111', '1.txt', NULL, '1.pdf', NULL, NULL, NULL, '1.exe', NULL, '', NULL, '1.sss', NULL, '', NULL);
INSERT INTO `file` VALUES ('202422222222', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202433333333', '3.txt', NULL, '3.pdf', NULL, NULL, NULL, '3.exe', NULL, '', NULL, '3.sss', NULL, '', NULL);
INSERT INTO `file` VALUES ('202444444444', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202455555555', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202466666666', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202477777777', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202488888888', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, '1.txt', NULL, '1.txt', NULL, '', NULL);
INSERT INTO `file` VALUES ('202499999999', '1.txt', NULL, '1.txt', NULL, NULL, NULL, '1.txt', NULL, 'uploads/202499999999/毕业论文终稿.pdf', NULL, '1.txt', NULL, 'uploads/202499999999/毕业论文终稿.pdf', NULL);

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `group_id` int NOT NULL,
  `stu_group_id` int NULL DEFAULT NULL,
  `teacher_group_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE,
  INDEX `teacher_group_id`(`teacher_group_id` ASC) USING BTREE,
  INDEX `stu_group_id`(`stu_group_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES (1, 1, 1);
INSERT INTO `group` VALUES (2, 2, 2);
INSERT INTO `group` VALUES (3, 3, 3);

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `score_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `startScore1` float(2, 1) NULL DEFAULT NULL COMMENT '开题报告得分1',
  `startScore2` float(2, 1) NULL DEFAULT NULL COMMENT '开题报告得分2',
  `startScore3` float(2, 1) NULL DEFAULT NULL COMMENT '开题报告得分3',
  `startScore` float(3, 1) NULL DEFAULT NULL COMMENT '开题报告得分',
  `start_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（开题打分）',
  `transScore1` float(2, 1) NULL DEFAULT NULL COMMENT '外文翻译得分1',
  `transScore2` float(2, 1) NULL DEFAULT NULL COMMENT '外文翻译得分2',
  `transScore3` float(2, 1) NULL DEFAULT NULL COMMENT '外文翻译得分3',
  `transScore` float(2, 1) NULL DEFAULT NULL COMMENT '外文翻译得分',
  `trans_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '指导老师（外文翻译）',
  `midScore1` float(2, 1) NULL DEFAULT NULL COMMENT '中期检查得分1',
  `midScore2` float(2, 1) NULL DEFAULT NULL COMMENT '中期检查得分2',
  `midScore3` float(2, 1) NULL DEFAULT NULL COMMENT '中期检查得分3',
  `midScore` float(3, 1) NULL DEFAULT NULL COMMENT '中期检查得分',
  `midEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '中期检查评价',
  `mid_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（中期打分）',
  `teachScore1` float(2, 1) NULL DEFAULT NULL COMMENT '指导老师打分1',
  `teachScore2` float(2, 1) NULL DEFAULT NULL COMMENT '指导老师打分2',
  `teachScore3` float(2, 1) NULL DEFAULT NULL COMMENT '指导老师打分3',
  `teachScore4` float(2, 1) NULL DEFAULT NULL COMMENT '指导老师打分4',
  `teachScore5` float(2, 1) NULL DEFAULT NULL COMMENT '指导老师打分5',
  `teachScore` float(3, 1) NULL DEFAULT NULL COMMENT '指导老师打分',
  `teachEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '指导老师评价',
  `teach_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '指导老师（终稿）',
  `readScore1` float(2, 1) NULL DEFAULT NULL COMMENT '评阅老师打分1',
  `readScore2` float(2, 1) NULL DEFAULT NULL COMMENT '评阅老师打分2',
  `readScore3` float(2, 1) NULL DEFAULT NULL COMMENT '评阅老师打分3',
  `readScore4` float(2, 1) NULL DEFAULT NULL COMMENT '评阅老师打分4',
  `readScore` float(3, 1) NULL DEFAULT NULL COMMENT '评阅老师打分',
  `readEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '评阅老师评价',
  `read_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评阅老师（终稿评阅打分）',
  `defScore1` float(3, 1) NULL DEFAULT NULL COMMENT '答辩得分1',
  `defScore2` float(3, 1) NULL DEFAULT NULL COMMENT '答辩得分2',
  `defScore3` float(3, 1) NULL DEFAULT NULL COMMENT '答辩得分3',
  `defScore4` float(3, 1) NULL DEFAULT NULL COMMENT '答辩得分4',
  `defScore` float(3, 1) NULL DEFAULT NULL COMMENT '答辩得分',
  `defEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答辩评价',
  `def_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（答辩打分）',
  `finalScore` float(3, 1) NULL DEFAULT NULL COMMENT '总评成绩',
  `finalEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '总评',
  `final_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '小组秘书（最终评价）',
  PRIMARY KEY (`score_id`) USING BTREE,
  INDEX `start_id`(`start_id` ASC) USING BTREE,
  INDEX `trans_id`(`trans_id` ASC) USING BTREE,
  INDEX `mid_id`(`mid_id` ASC) USING BTREE,
  INDEX `teach_id`(`teach_id` ASC) USING BTREE,
  INDEX `read_id`(`read_id` ASC) USING BTREE,
  INDEX `def_id`(`def_id` ASC) USING BTREE,
  INDEX `final_id`(`final_id` ASC) USING BTREE,
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`score_id`) REFERENCES `stu` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`start_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_3` FOREIGN KEY (`trans_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_4` FOREIGN KEY (`mid_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_5` FOREIGN KEY (`teach_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_6` FOREIGN KEY (`read_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_7` FOREIGN KEY (`def_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_8` FOREIGN KEY (`final_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('202411111111', NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, NULL, '111122222222', NULL, NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, '111122222222');
INSERT INTO `score` VALUES ('202422222222', NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, NULL, '111122222222', NULL, NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, '111122222222');
INSERT INTO `score` VALUES ('202433333333', NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111111111111', NULL, NULL, NULL, NULL, NULL, NULL, '111122222222', NULL, NULL, NULL, NULL, NULL, NULL, '111133333333', NULL, NULL, '111122222222');
INSERT INTO `score` VALUES ('202444444444', NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, NULL, '111155555555', NULL, NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, '111155555555');
INSERT INTO `score` VALUES ('202455555555', NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, NULL, '111155555555', NULL, NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, '111155555555');
INSERT INTO `score` VALUES ('202466666666', NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111144444444', NULL, NULL, NULL, NULL, NULL, NULL, '111155555555', NULL, NULL, NULL, NULL, NULL, NULL, '111166666666', NULL, NULL, '111155555555');
INSERT INTO `score` VALUES ('202477777777', NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, NULL, '111188888888', NULL, NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, '111188888888');
INSERT INTO `score` VALUES ('202488888888', NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, NULL, '111188888888', NULL, NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, '111188888888');
INSERT INTO `score` VALUES ('202499999999', NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111177777777', NULL, NULL, NULL, NULL, NULL, NULL, '111188888888', NULL, NULL, NULL, NULL, NULL, NULL, '111199999999', NULL, NULL, '111188888888');

-- ----------------------------
-- Table structure for stu
-- ----------------------------
DROP TABLE IF EXISTS `stu`;
CREATE TABLE `stu`  (
  `stu_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stu_states` int NOT NULL,
  `stu_guide_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `stu_outschool` tinyint(1) NULL DEFAULT NULL,
  `stu_group_id` int NOT NULL,
  `stu_major` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stu_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`stu_id`) USING BTREE,
  INDEX `stu_guide_id`(`stu_guide_id` ASC) USING BTREE,
  INDEX `stu_group_id`(`stu_group_id` ASC) USING BTREE,
  CONSTRAINT `stu_ibfk_2` FOREIGN KEY (`stu_guide_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stu_ibfk_3` FOREIGN KEY (`stu_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stu
-- ----------------------------
INSERT INTO `stu` VALUES ('202411111111', 5, '111111111111', NULL, 1, '计算机科学与技术', '211');
INSERT INTO `stu` VALUES ('202422222222', 2, '111111111111', 1, 1, '计算机科学与技术', '211');
INSERT INTO `stu` VALUES ('202433333333', 3, '111111111111', NULL, 1, '计算机科学与技术', '211');
INSERT INTO `stu` VALUES ('202444444444', 4, '111144444444', 1, 2, '计算机科学与技术', '211');
INSERT INTO `stu` VALUES ('202455555555', 2, '111144444444', NULL, 2, '计算机科学与技术', '212');
INSERT INTO `stu` VALUES ('202466666666', 3, '111144444444', 1, 2, '计算机科学与技术', '212');
INSERT INTO `stu` VALUES ('202477777777', 2, '111177777777', NULL, 3, '计算机科学与技术', '212');
INSERT INTO `stu` VALUES ('202488888888', 2, '111177777777', 1, 3, '计算机科学与技术', '212');
INSERT INTO `stu` VALUES ('202499999999', 3, '111177777777', NULL, 3, '计算机科学与技术', '213');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacher_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_group_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `teacher_group_id`(`teacher_group_id` ASC) USING BTREE,
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('111111111111', '指导教师', 1);
INSERT INTO `teacher` VALUES ('111122222222', '小组秘书兼评阅教师', 1);
INSERT INTO `teacher` VALUES ('111133333333', '组长', 1);
INSERT INTO `teacher` VALUES ('111144444444', '指导教师', 2);
INSERT INTO `teacher` VALUES ('111155555555', '小组秘书兼评阅教师', 2);
INSERT INTO `teacher` VALUES ('111166666666', '组长', 2);
INSERT INTO `teacher` VALUES ('111177777777', '指导教师', 3);
INSERT INTO `teacher` VALUES ('111188888888', '小组秘书兼评阅教师', 3);
INSERT INTO `teacher` VALUES ('111199999999', '组长', 3);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `area` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `detailAdd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('111111111111', '老师', 'wq', '19', '女', '00000000001', '001', '000001', '000001', '000001', '001', '0001', '001');
INSERT INTO `user` VALUES ('111122222222', '老师', 'qd', '63', '男', '00000000002', '002', '000002', '000002', '000002', '002', '0002', '002');
INSERT INTO `user` VALUES ('111133333333', '老师', 'jf', '62', '女', '00000000003', '003', '000003', '000003', '000003', '003', '0003', '003');
INSERT INTO `user` VALUES ('111144444444', '老师', 'dm', '74', '男', '00000000004', '004', '000004', '000004', '000004', '004', '0004', '004');
INSERT INTO `user` VALUES ('111155555555', '老师', 'nr', '48', '女', '00000000005', '005', '000005', '000005', '000005', '005', '0005', '005');
INSERT INTO `user` VALUES ('111166666666', '老师', 'jt', '94', '男', '00000000006', '006', '000006', '000006', '000006', '006', '0006', '006');
INSERT INTO `user` VALUES ('111177777777', '老师', 'hd', '63', '女', '00000000007', '007', '000007', '000007', '000007', '007', '0007', '007');
INSERT INTO `user` VALUES ('111188888888', '老师', 'nd', '47', '男', '00000000008', '008', '000008', '000008', '000008', '008', '0008', '008');
INSERT INTO `user` VALUES ('111199999999', '老师', 'sr', '54', '女', '56789101112', '105', '141414', '141414', '141414', '141', '1414', '14');
INSERT INTO `user` VALUES ('202411111111', '学生', '11', '9', '男', '11111111111', '111', '350000', '350100', '350104', '111', '2222234324234231221', '1');
INSERT INTO `user` VALUES ('202422222222', '学生', 'fd', '34', '男', '66677778888', '777', '777777', '777777', '777777', '777', '7777', '7');
INSERT INTO `user` VALUES ('202433333333', '学生', 'as', '20', '女', '22233334444', '333', '333333', '333333', '333333', '333', '3333', '3');
INSERT INTO `user` VALUES ('202444444444', '学生', 'gd', '23', '女', '77788889999', '888', '888888', '888888', '888888', '888', '8888', '8');
INSERT INTO `user` VALUES ('202455555555', '学生', 'gd', '45', '男', '88899991010', '999', '999999', '999999', '999999', '999', '9999', '9');
INSERT INTO `user` VALUES ('202466666666', '学生', 'jd', '36', '女', '12345678910', '101', '101010', '101010', '101010', '101', '1010', '10');
INSERT INTO `user` VALUES ('202477777777', '学生', 'od', '12', '男', '23456789101', '102', '111111', '111111', '111111', '111', '1111', '11');
INSERT INTO `user` VALUES ('202488888888', '学生', 'kj', '24', '女', '34567891011', '103', '121212', '121212', '121212', '121', '1212', '12');
INSERT INTO `user` VALUES ('202499999999', '学生', 'xs', '26', '男', '45678910121', '104', '131313', '131313', '131313', '131', '1313', '13');

-- ----------------------------
-- Triggers structure for table score
-- ----------------------------
DROP TRIGGER IF EXISTS `count`;
delimiter ;;
CREATE TRIGGER `count` BEFORE UPDATE ON `score` FOR EACH ROW BEGIN
  SET NEW.transScore = NEW.transScore1 + NEW.transScore2 + NEW.transScore3;
	SET NEW.startScore = NEW.startScore1 + NEW.startScore2 + NEW.startScore3;
	SET NEW.midScore = NEW.midScore1 + NEW.midScore2 + NEW.midScore3;
	SET NEW.teachScore = NEW.teachScore1 + NEW.teachScore2 + NEW.teachScore3+ NEW.teachScore4 + NEW.teachScore5;
	SET NEW.readScore = NEW.readScore1 + NEW.readScore2 + NEW.readScore3+ NEW.readScore4;
	SET NEW.defScore = NEW.defScore1 + NEW.defScore2 + NEW.defScore3+ NEW.defScore4;
	SET NEW.finalScore = NEW.transScore +NEW.startScore + NEW.midScore + NEW.teachScore+ NEW.readScore+ NEW.defScore;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
