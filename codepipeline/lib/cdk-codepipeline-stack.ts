import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

export class CdkCodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "CDKPipeline", {
      pipelineName: "CDKPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "mohamedsamara/aws-cdk-codepipeline",
          "main"
        ),
        commands: [
          "cd codepipeline",
          "npm ci",
          "npm run build",
          "npx cdk synth",
        ],
        primaryOutputDirectory: "codepipeline/cdk.out",
      }),
    });
  }
}
